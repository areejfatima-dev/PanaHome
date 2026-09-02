export type RoomType = 'living_room' | 'kitchen' | 'bedroom' | 'bathroom' | 'garage' | 'other';

export type CaptureStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export type SpotStatus = 'pending' | 'capturing' | 'completed' | 'failed';

export type QualityTier = 'basic' | 'enhanced' | 'full';

// ─── Supabase table row types ────────────────────────────────────────────────

export interface PropertyRoomRow {
  id: string;
  floor_id: string;
  name: string;
  type: RoomType;
  capture_status: CaptureStatus;
  quality_tier: QualityTier | null;
  spot_count: number | null;
  created_at: string;
}

export interface PropertyFloorRow {
  id: string;
  property_id: string;
  floor_number: number;
  name: string;
  created_at: string;
}

// ─── Form input types (for the wizard) ───────────────────────────────────────

export interface RoomInput {
  id: string;
  name: string;
  type: RoomType;
}

export interface FloorInput {
  id: string;
  floor_number: number;
  name: string;
  rooms: RoomInput[];
}

export interface Photo {
  id: string;
  uri: string;
  sector: number;
  is_blurry: boolean;
  blur_score: number;
  captured_at: string;
}

export interface CaptureSpot {
  id: string;
  spot_number: number;
  coverage_percent: number;
  status: SpotStatus;
  photo_count: number;
  photos: Photo[];
}

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  capture_status: CaptureStatus;
  quality_tier: QualityTier | null;
  spot_count: number;
  capture_spots: CaptureSpot[];
}

export interface Floor {
  id: string;
  floor_number: number;
  name: string;
  rooms: Room[];
}

export interface PropertyStructure {
  id: string;
  seller_id: string;
  address: string;
  city: string;
  total_floors: number;
  capture_status: CaptureStatus;
  floors: Floor[];
  created_at: string;
  updated_at: string;
}

export interface RoomOption {
  label: string;
  value: RoomType;
  icon: string;
}

export const ROOM_OPTIONS: RoomOption[] = [
  { label: 'Living Room', value: 'living_room', icon: 'weekend' },
  { label: 'Kitchen', value: 'kitchen', icon: 'kitchen' },
  { label: 'Bedroom', value: 'bedroom', icon: 'bed' },
  { label: 'Bathroom', value: 'bathroom', icon: 'bathtub' },
  { label: 'Garage', value: 'garage', icon: 'garage' },
  { label: 'Other', value: 'other', icon: 'door-front' },
];

export const QUALITY_TIER_LABELS: Record<QualityTier, string> = {
  basic: 'Basic',
  enhanced: 'Enhanced',
  full: 'Full Coverage',
};

export function getQualityTier(spotCount: number): QualityTier {
  if (spotCount >= 3) return 'full';
  if (spotCount === 2) return 'enhanced';
  return 'basic';
}

export function getRoomTypeIcon(type: RoomType): string {
  const option = ROOM_OPTIONS.find((o) => o.value === type);
  return option?.icon ?? 'door-front';
}

export function getRoomTypeLabel(type: RoomType): string {
  const option = ROOM_OPTIONS.find((o) => o.value === type);
  return option?.label ?? 'Other';
}
