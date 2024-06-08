import { useEffect } from 'react';

import usePrefStore from '../../stores/pref';
import Card from '../Card';
import TextInput from '../TextInput';
import Vertical from '../Vertical';

export default function Preferences() {
  const { gameDir, setGameDir } = usePrefStore();

  useEffect(() => {
    if (!gameDir) {
      void logReader.resolveGamePath().then(setGameDir);
    }
  }, [gameDir, setGameDir]);

  return (
    <Card>
      <Vertical>
        <TextInput
          value={gameDir ?? 'Detecting Wuthering Waves Game Directory...'}
          placeholder="Wuthering Waves Game Directory"
          onChange={(e) => setGameDir(e.target.value)}
        />
      </Vertical>
    </Card>
  );
}
