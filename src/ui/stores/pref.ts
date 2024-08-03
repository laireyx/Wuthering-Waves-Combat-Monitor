import { create } from 'zustand';

import { Lang } from '@common/resources/loader';

interface PrefStore {
  gamePath: string | null;
  lang: Lang | null;

  setGamePath: (gamePath: string | null) => void;
  setLang: (lang: Lang) => void;
}

const usePrefStore = create<PrefStore>((set) => ({
  gamePath: localStorage.getItem('gameDir'),
  lang: localStorage.getItem('lang') as Lang | null,

  setGamePath: (gamePath) => {
    if (gamePath) localStorage.setItem('gamePath', gamePath);
    set({ gamePath });
  },

  setLang: (lang) => {
    if (lang) localStorage.setItem('lang', lang);
    set({ lang });
  },
}));

export default usePrefStore;
