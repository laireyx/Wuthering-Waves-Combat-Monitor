import { useEffect, useState } from 'react';

import CombatDamage from './components/CombatDamage';
import CombatStatus from './components/CombatStatus';
import usePushLog from './hooks/usePushLog';
import usePrefStore from '../../stores/pref';
import Card from '../Card';

export default function CombatMonitor() {
  const { gameDir } = usePrefStore();
  const [lastReadPos, setLastReadPos] = useState(0);

  const pushLog = usePushLog();

  useEffect(() => {
    const intervalHandle = setInterval(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async () => {
        const { data, position } = await logReader.read({
          filename: `${gameDir}\\Client\\Saved\\Logs\\Client.log`,
          position: lastReadPos,
        });

        data.forEach(pushLog);
        setLastReadPos(position);
      },
      500,
    );

    return () => clearInterval(intervalHandle);
  }, [gameDir, lastReadPos, pushLog]);

  return (
    <Card>
      <CombatStatus />
      <CombatDamage />
    </Card>
  );
}
