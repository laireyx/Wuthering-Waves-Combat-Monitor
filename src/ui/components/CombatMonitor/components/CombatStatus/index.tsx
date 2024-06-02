import { useState, useEffect } from 'react';

import useCombatMonitorStore from 'src/ui/stores/combatMonitor';
import fillZero from 'src/ui/utils/fillZero';

import { numberStyle } from './index.css';

export default function CombatStatus() {
  const { inFight, fightDuration, totalDamage } = useCombatMonitorStore();

  const [dps, setDps] = useState(0);

  const durationInSec = fightDuration();
  const durationStr = `${fillZero(Math.round(durationInSec / 60), 2)}:${fillZero(Math.round(durationInSec) % 60, 2)}`;

  useEffect(() => {
    if (inFight) {
      setTimeout(() => setDps(totalDamage / fightDuration()));
    } else if (totalDamage > 0 && dps === 0) {
      setDps(totalDamage / fightDuration());
    }
  }, [dps, fightDuration, inFight, totalDamage]);

  return (
    <div>
      Current Status: {inFight ? 'In Fight' : 'Idle'}
      <br />
      Duration: {durationStr}
      <br />
      Total Damage: <span className={numberStyle}>{totalDamage}</span>
      <br />
      DPS: <span className={numberStyle}>{Math.round(dps)}</span>
    </div>
  );
}
