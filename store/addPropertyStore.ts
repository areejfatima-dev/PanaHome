import { create } from 'zustand';
import { FloorInput, CaptureStatus } from '@/types/ar';

export interface RoomCaptureState {
  roomId: string;
  status: CaptureStatus;
}

interface AddPropertyState {
  // Step 1
  title: string;
  description: string;
  propertyType: string;
  area: string;

  // Step 2
  address: string;
  city: string;
  floors: FloorInput[];

  // Step 3
  frontElevationUri: string | null;
  roomCaptureStatuses: RoomCaptureState[];

  // Supabase IDs (set after persist)
  propertyId: string | null;
  floorIds: Record<string, string>;   // temp_id → real uuid
  roomIds: Record<string, string>;    // temp_id → real uuid

  // Actions
  setStep1: (data: { title: string; description: string; propertyType: string; area: string }) => void;
  setStep2: (data: { address: string; city: string; floors: FloorInput[] }) => void;
  setFrontElevation: (uri: string | null) => void;
  setRoomCaptureStatus: (roomId: string, status: CaptureStatus) => void;
  getRoomCaptureStatus: (roomId: string) => CaptureStatus;
  setSupabaseIds: (data: { propertyId: string; floorIds: Record<string, string>; roomIds: Record<string, string> }) => void;
  reset: () => void;
}

const initialState = {
  title: '',
  description: '',
  propertyType: 'Apartment',
  area: '',
  address: '',
  city: '',
  floors: [] as FloorInput[],
  frontElevationUri: null as string | null,
  roomCaptureStatuses: [] as RoomCaptureState[],
  propertyId: null as string | null,
  floorIds: {} as Record<string, string>,
  roomIds: {} as Record<string, string>,
};

export const useAddPropertyStore = create<AddPropertyState>((set, get) => ({
  ...initialState,

  setStep1: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  setStep2: (data) =>
    set((state) => ({
      ...state,
      address: data.address,
      city: data.city,
      floors: data.floors,
    })),

  setFrontElevation: (uri) => set({ frontElevationUri: uri }),

  setRoomCaptureStatus: (roomId, status) =>
    set((state) => {
      const existing = state.roomCaptureStatuses.find((s) => s.roomId === roomId);
      if (existing) {
        return {
          roomCaptureStatuses: state.roomCaptureStatuses.map((s) =>
            s.roomId === roomId ? { ...s, status } : s
          ),
        };
      }
      return {
        roomCaptureStatuses: [...state.roomCaptureStatuses, { roomId, status }],
      };
    }),

  getRoomCaptureStatus: (roomId) => {
    const state = get();
    return state.roomCaptureStatuses.find((s) => s.roomId === roomId)?.status ?? 'pending';
  },

  setSupabaseIds: (data) =>
    set({
      propertyId: data.propertyId,
      floorIds: data.floorIds,
      roomIds: data.roomIds,
    }),

  reset: () => set(initialState),
}));
