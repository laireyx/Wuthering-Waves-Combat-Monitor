import Vertical from 'src/ui/components/Vertical';
import useCombatMonitorStore from 'src/ui/stores/combatMonitor';

import { combatDamageStyle } from './index.css';

export default function CombatDamage() {
  const { totalDamage, fightStart, fightEnd, fightParts } =
    useCombatMonitorStore();

  const partNames = Object.keys(fightParts);

  console.log(fightParts);

  return (
    <Vertical>
      Total Damage: {totalDamage}
      <br />
      DPS: {totalDamage / ((fightEnd - fightStart) / 1000)}
      <br />
      <ul className={combatDamageStyle}>
        {partNames.map((partName) => (
          <li key={partName}>{fightParts[partName].accumulatedDamage}</li>
        ))}
      </ul>
    </Vertical>
  );
}
