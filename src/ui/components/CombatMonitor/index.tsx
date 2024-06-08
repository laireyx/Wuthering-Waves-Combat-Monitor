import { useEffect, useState } from 'react';

import CombatBuffs from './components/CombatBuffs';
import CombatStatus from './components/CombatStatus';
import usePushLog from './hooks/usePushLog';
import usePrefStore from '../../stores/pref';
import Card from '../Card';
import Vertical from '../Vertical';

import { combatMonitorStyle } from './index.css';

export default function CombatMonitor() {
  const { gamePath } = usePrefStore();
  const [lastReadPos, setLastReadPos] = useState(0);

  const pushLog = usePushLog();

  useEffect(() => {
    const intervalHandle = setInterval(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async () => {
        if (!gamePath) return;

        const { data, position } = await logReader.read({
          filename: `${gamePath}\\Wuthering Waves Game\\Client\\Saved\\Logs\\Client.log`,
          position: lastReadPos,
        });

        data.forEach(pushLog);
        setLastReadPos(position);
      },
      500,
    );

    return () => clearInterval(intervalHandle);
  }, [gamePath, lastReadPos, pushLog]);

  return (
    <Card>
      <Vertical className={combatMonitorStyle}>
        <CombatStatus />
        <CombatBuffs />
      </Vertical>
    </Card>
  );
}
