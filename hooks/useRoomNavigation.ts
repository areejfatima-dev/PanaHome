import { useState, useCallback } from 'react';

export interface Room {
  id: string;
  name: string;
  type: 'bedroom' | 'bathroom' | 'kitchen' | 'living' | 'dining' | 'other';
  area: number;
}

export interface RoomNavigationState {
  currentRoom: Room | null;
  rooms: Room[];
  isNavigating: boolean;
}

export function useRoomNavigation() {
  const [state, setState] = useState<RoomNavigationState>({
    currentRoom: null,
    rooms: [],
    isNavigating: false,
  });

  const setCurrentRoom = useCallback((room: Room | null) => {
    setState((prev) => ({ ...prev, currentRoom: room }));
  }, []);

  const addRoom = useCallback((room: Room) => {
    setState((prev) => ({
      ...prev,
      rooms: [...prev.rooms, room],
    }));
  }, []);

  const updateRoom = useCallback((roomId: string, updates: Partial<Room>) => {
    setState((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) =>
        r.id === roomId ? { ...r, ...updates } : r
      ),
    }));
  }, []);

  const removeRoom = useCallback((roomId: string) => {
    setState((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((r) => r.id !== roomId),
      currentRoom: prev.currentRoom?.id === roomId ? null : prev.currentRoom,
    }));
  }, []);

  const navigateToRoom = useCallback((roomId: string) => {
    setState((prev) => ({
      ...prev,
      isNavigating: true,
      currentRoom: prev.rooms.find((r) => r.id === roomId) || null,
    }));
    setTimeout(() => {
      setState((prev) => ({ ...prev, isNavigating: false }));
    }, 500);
  }, []);

  return {
    ...state,
    setCurrentRoom,
    addRoom,
    updateRoom,
    removeRoom,
    navigateToRoom,
  };
}