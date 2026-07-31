import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  activeTab: string;
  theme: 'dark' | 'light';
  notifications: number;
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: string) => void;
  toggleTheme: () => void;
  setNotifications: (count: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  activeTab: 'home',
  theme: 'dark',
  notifications: 0,
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  setActiveTab: (activeTab) => set({ activeTab }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setNotifications: (notifications) => set({ notifications }),
}));