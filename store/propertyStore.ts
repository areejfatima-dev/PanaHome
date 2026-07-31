import { create } from 'zustand';
import { Property } from '@/types/property';

interface PropertyState {
  properties: Property[];
  currentProperty: Property | null;
  favorites: string[];
  isLoading: boolean;
  setProperties: (properties: Property[]) => void;
  setCurrentProperty: (property: Property | null) => void;
  addToFavorites: (propertyId: string) => void;
  removeFromFavorites: (propertyId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  currentProperty: null,
  favorites: [],
  isLoading: false,
  setProperties: (properties) => set({ properties }),
  setCurrentProperty: (currentProperty) => set({ currentProperty }),
  addToFavorites: (propertyId) =>
    set((state) => ({
      favorites: [...state.favorites, propertyId],
    })),
  removeFromFavorites: (propertyId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== propertyId),
    })),
  setLoading: (isLoading) => set({ isLoading }),
}));