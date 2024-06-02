import { create } from 'zustand';

interface PrefStore {
  gameDir: string;

  setGameDir: (gameDir: string) => void;
}

const usePrefStore = create<PrefStore>((set) => ({
  gameDir:
    localStorage.getItem('gameDir') ??
    'D:\\Wuthering Waves\\Wuthering Waves Game',

  setGameDir: (gameDir) => {
    localStorage.setItem('gameDir', gameDir);
    set({ gameDir });
  },
}));

export default usePrefStore;
