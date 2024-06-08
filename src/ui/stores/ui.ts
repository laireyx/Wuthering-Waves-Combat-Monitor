import { create } from 'zustand';

interface UIStore {
  isPrefOpened: boolean;
  warning?: string;

  openPref: () => void;
  closePref: () => void;

  setWarning: (warning: string) => void;
  clearWarning: () => void;
}

const useUIStore = create<UIStore>((set) => ({
  isPrefOpened: false,

  openPref: () => set({ isPrefOpened: true }),
  closePref: () => set({ isPrefOpened: false }),

  setWarning: (warning) => set({ warning }),
  clearWarning: () => set({ warning: undefined }),
}));

export default useUIStore;
