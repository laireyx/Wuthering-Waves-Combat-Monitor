import useCombatMonitorStore from '../../../../stores/combatMonitor';
import fillZero from '../../../../utils/fillZero';
import Indicator from '../Indicator';
import IndicatorCaption from '../Indicator/Caption';

import {
  combatStatusStyle,
  combatStatusTitleStyle,
  fightStatusInFightStyle,
} from './index.css';

export default function CombatStatus() {
  const { status, inFight, fightDuration, staggerCount } =
    useCombatMonitorStore();

  const durationInSec = fightDuration() / 1000;
  const durationStr = `${fillZero(Math.floor(durationInSec / 60), 2)}:${fillZero(Math.round(durationInSec) % 60, 2)}`;

  return (
    <>
      <p className={combatStatusTitleStyle}>Combat Status</p>
      <div className={combatStatusStyle}>
        <Indicator className={inFight() ? fightStatusInFightStyle : ''}>
          <IndicatorCaption>Status</IndicatorCaption>
          {status === 'inFight'
            ? 'Fight'
            : status === 'inFightPaused'
              ? 'Fight-Paused'
              : 'Idle'}
        </Indicator>
        <Indicator>
          <IndicatorCaption>Duration</IndicatorCaption> {durationStr}
        </Indicator>

        <Indicator>
          <IndicatorCaption>Stagger Count</IndicatorCaption>
          {staggerCount > 0 ? staggerCount : '-'}
        </Indicator>
      </div>
    </>
  );
}
