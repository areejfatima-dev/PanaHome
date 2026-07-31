import { supabase } from './supabase';
import { Property } from '@/types/property';

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