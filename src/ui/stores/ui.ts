import { create } from 'zustand';

interface UIStore {
  isPrefOpened: boolean;

  togglePrefOpened: () => void;
}

const useUIStore = create<UIStore>((set) => ({
  isPrefOpened: false,

  togglePrefOpened: () =>
    set(({ isPrefOpened: isConfigOpened }) => ({
      isPrefOpened: !isConfigOpened,
    })),
}));

export default useUIStore;
