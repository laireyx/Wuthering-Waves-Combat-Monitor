import { create } from 'zustand';

interface PrefStore {
  gameDir: string | null;

  setGameDir: (gameDir: string) => void;
}

const usePrefStore = create<PrefStore>((set) => ({
  gameDir: localStorage.getItem('gameDir'),

  setGameDir: (gameDir) => {
    localStorage.setItem('gameDir', gameDir);
    set({ gameDir });
  },
}));

export default usePrefStore;
