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
  const { inFight, fightDuration, staggerCount, qteCount, hitCount } =
    useCombatMonitorStore();

  const durationInSec = fightDuration();
  const durationStr = `${fillZero(Math.floor(durationInSec / 60), 2)}:${fillZero(Math.round(durationInSec) % 60, 2)}`;

  return (
    <>
      <p className={combatStatusTitleStyle}>Combat Status</p>
      <div className={combatStatusStyle}>
        <Indicator className={inFight ? fightStatusInFightStyle : ''}>
          <IndicatorCaption>Status</IndicatorCaption>
          {inFight ? 'Fight' : 'Idle'}
        </Indicator>
        <Indicator>
          <IndicatorCaption>Duration</IndicatorCaption> {durationStr}
        </Indicator>

        <Indicator>
          <IndicatorCaption>Stagger Count</IndicatorCaption>
          {staggerCount > 0 ? staggerCount : '-'}
        </Indicator>
        <Indicator>
          <IndicatorCaption>Stagger Avg</IndicatorCaption>
          {staggerCount > 0 ? Math.round(fightDuration() / staggerCount) : '-'}s
        </Indicator>

        <Indicator>
          <IndicatorCaption>QTE Count</IndicatorCaption>
          {qteCount > 0 ? qteCount : '-'}
        </Indicator>
        <Indicator>
          <IndicatorCaption>QTE Avg</IndicatorCaption>
          {qteCount > 0 ? Math.round(fightDuration() / qteCount) : '-'}s
        </Indicator>

        <Indicator>
          <IndicatorCaption>Hit Count</IndicatorCaption>
          {hitCount > 0 ? hitCount : '-'}
        </Indicator>
      </div>
    </>
  );
}
