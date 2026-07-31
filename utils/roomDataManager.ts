import { Room } from '@/hooks/useRoomNavigation';

export interface RoomData {
  id: string;
  name: string;
  type: 'bedroom' | 'bathroom' | 'kitchen' | 'living' | 'dining' | 'other';
  area: number;
  photos: string[];
  measurements?: Record<string, number>;
}

export function createRoomData(room: Room): RoomData {
  return {
    id: room.id,
    name: room.name,
    type: room.type,
    area: room.area,
    photos: [],
    measurements: {},
  };
}

export function addPhotoToRoom(roomData: RoomData, photoUri: string): RoomData {
  return {
    ...roomData,
    photos: [...roomData.photos, photoUri],
  };
}

export function updateMeasurements(
  roomData: RoomData,
  measurements: Record<string, number>
): RoomData {
  return {
    ...roomData,
    measurements: { ...roomData.measurements, ...measurements },
  };
}

export function getRoomTypeLabel(type: Room['type']): string {
  const labels: Record<Room['type'], string> = {
    bedroom: 'Bedroom',
    bathroom: 'Bathroom',
    kitchen: 'Kitchen',
    living: 'Living Room',
    dining: 'Dining Room',
    other: 'Other',
  };
  return labels[type];
}

export function calculateTotalArea(rooms: RoomData[]): number {
  return rooms.reduce((total, room) => total + room.area, 0);
}