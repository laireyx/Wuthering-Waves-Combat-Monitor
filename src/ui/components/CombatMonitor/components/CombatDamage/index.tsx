import Vertical from 'src/ui/components/Vertical';

import { combatDamageStyle } from './index.css';

export default function CombatDamage() {
  return (
    <Vertical>
      <ul className={combatDamageStyle}></ul>
    </Vertical>
  );
}
