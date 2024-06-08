import { useEffect } from 'react';

import usePrefStore from '../stores/pref';

export default function useDefaultGamePath() {
  const { gamePath, setGamePath } = usePrefStore();

  useEffect(() => {
    if (!gamePath) {
      void logReader.resolveGamePath().then(setGamePath);
    }
  }, [gamePath, setGamePath]);
}
