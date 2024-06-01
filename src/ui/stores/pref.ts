import { create } from 'zustand';

interface PrefStore {
  gameDir: string;

  setGameDir: (gameDir: string) => void;
}

const usePrefStore = create<PrefStore>((set) => ({
  gameDir: 'D:\\Wuthering Waves\\Wuthering Waves Game',

  setGameDir: (gameDir) => set({ gameDir }),
}));

export default usePrefStore;
