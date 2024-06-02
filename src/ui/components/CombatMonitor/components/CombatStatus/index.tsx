import { useState, useEffect } from 'react';

import useCombatMonitorStore from 'src/ui/stores/combatMonitor';

export default function CombatStatus() {
  const { inFight, fightDuration, totalDamage } = useCombatMonitorStore();

  const [dps, setDps] = useState(0);

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
      Duration: {fightDuration()}
      <br />
      Total Damage: {totalDamage}
      <br />
      DPS: {dps}
    </div>
  );
}
