import { supabase } from './supabase';
import { Property } from '@/types/property';
import { FloorInput, PropertyFloorRow, PropertyRoomRow } from '@/types/ar';

export async function getProperties(limit = 20): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .limit(limit);

  if (error) {
    throw error;
  }

  return data as Property[];
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data as Property;
}

export async function createProperty(property: Partial<Property>): Promise<Property> {
  const { data, error } = await supabase
    .from('properties')
    .insert(property)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Property;
}

export async function updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Property;
}

export async function deleteProperty(id: string): Promise<void> {
  const { error } = await supabase.from('properties').delete().eq('id', id);
  if (error) {
    throw error;
  }
}

export async function searchProperties(query: string): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .ilike('title', `%${query}%`);

  if (error) {
    throw error;
  }

  return data as Property[];
}

export async function getFavorites(userId: string): Promise<Property[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('property:properties(*)')
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  return (data as any[])?.map((item) => item.property) ?? [];
}

export async function addToFavorites(userId: string, propertyId: string): Promise<void> {
  const { error } = await supabase.from('favorites').insert({
    user_id: userId,
    property_id: propertyId,
  });
  if (error) {
    throw error;
  }
}

export async function removeFromFavorites(userId: string, propertyId: string): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('property_id', propertyId);
  if (error) {
    throw error;
  }
}

// ─── Property Structure (AR Walkthrough — Step 1) ─────────────────────────────

export interface CreateStructureInput {
  sellerId: string;
  title: string;
  description: string;
  propertyType: string;
  area: string;
  location: string;
  city: string;
  floors: FloorInput[];
}

export interface CreateStructureResult {
  propertyId: string;
  floorIds: Record<string, string>;   // temp_id → real uuid
  roomIds: Record<string, string>;    // temp_id → real uuid
}

/**
 * Inserts a property row, its floors, and its rooms into Supabase.
 * Returns the created property ID and mapping from temp IDs to real UUIDs.
 */
export async function createPropertyWithStructure(
  input: CreateStructureInput
): Promise<CreateStructureResult> {
  const { sellerId, title, description, propertyType, area, location, city, floors } = input;
  const totalFloors = floors.length;

  // 1. Insert property
  const { data: propertyRow, error: propErr } = await supabase
    .from('properties')
    .insert({
      seller_id: sellerId,
      title,
      description,
      property_type: propertyType,
      area,
      location,
      city,
      total_floors: totalFloors,
      status: 'not_started',
    })
    .select('id')
    .single();

  if (propErr) throw propErr;
  const propertyId = propertyRow.id as string;

  // 2. Insert floors
  const floorRows = floors.map((f) => ({
    property_id: propertyId,
    floor_number: f.floor_number,
    name: f.name,
  }));

  const { data: insertedFloors, error: floorErr } = await supabase
    .from('property_floors')
    .insert(floorRows)
    .select('id, floor_number');

  if (floorErr) throw floorErr;

  // Build temp_id → real_id map for floors
  const floorIds: Record<string, string> = {};
  for (const inserted of insertedFloors!) {
    const match = floors.find((f) => f.floor_number === inserted.floor_number);
    if (match) floorIds[match.id] = inserted.id;
  }

  // 3. Insert rooms (batch per floor to preserve ordering)
  const allRoomInserts: Array<{
    floor_id: string;
    name: string;
    type: string;
    tempId: string;
  }> = [];

  for (const floor of floors) {
    const realFloorId = floorIds[floor.id];
    for (const room of floor.rooms) {
      allRoomInserts.push({
        floor_id: realFloorId,
        name: room.name,
        type: room.type,
        tempId: room.id,
      });
    }
  }

  const { data: insertedRooms, error: roomErr } = await supabase
    .from('property_rooms')
    .insert(
      allRoomInserts.map((r) => ({
        floor_id: r.floor_id,
        name: r.name,
        type: r.type,
        capture_status: 'pending',
      }))
    )
    .select('id, floor_id, name');

  if (roomErr) throw roomErr;

  // Build temp_id → real_id map for rooms
  const roomIds: Record<string, string> = {};
  for (const inserted of insertedRooms!) {
    const match = allRoomInserts.find(
      (r) => r.floor_id === inserted.floor_id && r.name === inserted.name
    );
    if (match) roomIds[match.tempId] = inserted.id;
  }

  return { propertyId, floorIds, roomIds };
}

// ─── Fetch Property Structure (Capture Checklist — Step 2) ────────────────────

export interface PropertyStructureFloor {
  id: string;
  floor_number: number;
  name: string;
}

export interface PropertyStructureRoom {
  id: string;
  floor_id: string;
  name: string;
  type: string;
  capture_status: string;
  quality_tier: string | null;
  spot_count: number | null;
}

export interface PropertyStructureData {
  propertyId: string;
  seller_id: string;
  title: string;
  description: string;
  property_type: string;
  area: string;
  location: string;
  city: string;
  total_floors: number;
  status: string;
  floors: Array<PropertyStructureFloor & { rooms: PropertyStructureRoom[] }>;
}

/**
 * Fetches a property with its floors and rooms from Supabase.
 * Returns a nested structure grouped by floor.
 */
export async function getPropertyStructure(propertyId: string): Promise<PropertyStructureData> {
  // 1. Fetch property
  const { data: property, error: propErr } = await supabase
    .from('properties')
    .select('id, seller_id, title, description, property_type, area, location, city, total_floors, status')
    .eq('id', propertyId)
    .single();

  if (propErr) throw propErr;

  // 2. Fetch floors
  const { data: floors, error: floorErr } = await supabase
    .from('property_floors')
    .select('id, floor_number, name')
    .eq('property_id', propertyId)
    .order('floor_number', { ascending: true });

  if (floorErr) throw floorErr;

  // 3. Fetch rooms for all floors
  const floorIds = (floors ?? []).map((f) => f.id);
  let rooms: PropertyStructureRoom[] = [];

  if (floorIds.length > 0) {
    const { data: roomRows, error: roomErr } = await supabase
      .from('property_rooms')
      .select('id, floor_id, name, type, capture_status, quality_tier, spot_count')
      .in('floor_id', floorIds);

    if (roomErr) throw roomErr;
    rooms = (roomRows ?? []) as PropertyStructureRoom[];
  }

  // 4. Nest rooms under their floors
  const floorsWithRooms = (floors ?? []).map((floor) => ({
    ...floor,
    rooms: rooms.filter((r) => r.floor_id === floor.id),
  }));

  return {
    propertyId: property.id,
    seller_id: property.seller_id,
    title: property.title,
    description: property.description,
    property_type: property.property_type,
    area: property.area,
    location: property.location,
    city: property.city,
    total_floors: property.total_floors,
    status: property.status,
    floors: floorsWithRooms,
  };
}