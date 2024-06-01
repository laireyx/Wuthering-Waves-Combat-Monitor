import { useEffect, useState } from 'react';

import usePrefStore from '../../stores/pref';
import Vertical from '../Vertical';

export default function CombatMonitor() {
  const { gameDir } = usePrefStore();
  const [lastReadPos, setLastReadPos] = useState(0);

  useEffect(() => {
    setTimeout(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async () => {
        const { data, position } = await logReader.read(
          `${gameDir}\\Client\\Saved\\Logs\\Client.log`,
          lastReadPos,
        );

        console.log(data);
        setLastReadPos(position);
      },
      500,
    );
  }, [gameDir, lastReadPos]);

  return <Vertical></Vertical>;
}
