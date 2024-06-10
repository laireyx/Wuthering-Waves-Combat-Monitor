import { create } from 'zustand';

interface PrefStore {
  gamePath: string | null;

  setGamePath: (gamePath: string | null) => void;
}

const usePrefStore = create<PrefStore>((set) => ({
  gamePath: localStorage.getItem('gameDir'),

  setGamePath: (gamePath) => {
    if (gamePath) localStorage.setItem('gamePath', gamePath);
    set({ gamePath });
  },
}));

export default usePrefStore;
