import CombatMonitor from '../CombatMonitor';
import Vertical from '../Vertical';

import { mainStyle } from './index.css';

export default function Main() {
  return (
    <Vertical className={mainStyle}>
      <CombatMonitor />
    </Vertical>
  );
}
