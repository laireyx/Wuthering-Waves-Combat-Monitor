import { useEffect, useState } from 'react';

import Vertical from 'src/ui/components/Vertical';
import useCombatMonitorStore from 'src/ui/stores/combatMonitor';

import { combatDamageStyle } from './index.css';

export default function CombatDamage() {
  const { inFight, totalDamage, fightParts, fightDuration } =
    useCombatMonitorStore();

  const partNames = Object.keys(fightParts);
  const [dps, setDps] = useState(0);

  useEffect(() => {
    if (inFight) {
      setTimeout(() => setDps(totalDamage / fightDuration()));
    } else if (totalDamage > 0 && dps === 0) {
      setDps(totalDamage / fightDuration());
    }
  }, [dps, fightDuration, inFight, totalDamage]);

  return (
    <Vertical>
      Duration: {fightDuration()}
      <br />
      Total Damage: {totalDamage}
      <br />
      DPS: {dps}
      <br />
      <ul className={combatDamageStyle}>
        {partNames.map((partName) => (
          <li key={partName}>{fightParts[partName].accumulatedDamage}</li>
        ))}
      </ul>
    </Vertical>
  );
}
