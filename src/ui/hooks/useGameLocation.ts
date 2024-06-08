import { useEffect } from 'react';

import usePrefStore from '../stores/pref';
import useUIStore from '../stores/ui';

export default function useDefaultGamePath() {
  const { gamePath, setGamePath } = usePrefStore();
  const { setWarning } = useUIStore();

  useEffect(() => {
    if (!gamePath) {
      void logReader
        .resolveGamePath()
        .then(setGamePath)
        .catch(() => {
          setWarning(
            'Could not find game directory.\nYou need to specify its path manually(by right-top side button).',
          );
        });
    }
  }, [gamePath, setGamePath, setWarning]);
}
