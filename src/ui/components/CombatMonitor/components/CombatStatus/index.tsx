import { useResource } from '../../../../hooks/useResource';
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
  const strings = useResource<ApplicationStrings>('strings');

  const { status, inFight, fightDuration, staggerCount } =
    useCombatMonitorStore();

  const durationInSec = fightDuration() / 1000;
  const durationStr = `${fillZero(Math.floor(durationInSec / 60), 2)}:${fillZero(Math.round(durationInSec) % 60, 2)}`;

  return (
    <>
      <p className={combatStatusTitleStyle}>{strings.combatStatusTitle}</p>
      <div className={combatStatusStyle}>
        <Indicator className={inFight() ? fightStatusInFightStyle : ''}>
          <IndicatorCaption>{strings.combatStatusLabel}</IndicatorCaption>
          {status === 'inFight'
            ? strings.combatStatusInFight
            : status === 'inFightPaused'
              ? strings.combatStatusInFightPaused
              : strings.combatStatusIdle}
        </Indicator>
        <Indicator>
          <IndicatorCaption>{strings.combatDurationLabel}</IndicatorCaption>{' '}
          {durationStr}
        </Indicator>

        <Indicator>
          <IndicatorCaption>{strings.combatStaggerLabel}</IndicatorCaption>
          {staggerCount > 0 ? staggerCount : '-'}
        </Indicator>
      </div>
    </>
  );
}
