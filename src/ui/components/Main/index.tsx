import CombatMonitor from '../CombatMonitor';
import Preferences from '../Preferences';
import Vertical from '../Vertical';

import { mainStyle } from './index.css';

export default function Main() {
  return (
    <Vertical className={mainStyle}>
      <Preferences />
      <CombatMonitor />
    </Vertical>
  );
}
