import { useState, useEffect } from 'react';

import useCombatMonitorStore from '../../../../stores/combatMonitor';
import fillZero from '../../../../utils/fillZero';
import Indicator from '../Indicator';
import IndicatorCaption from '../Indicator/Caption';

import {
  combatStatusStyle,
  combatStatusTitleStyle,
  damageStyle,
  fightStatusInFightStyle,
} from './index.css';

export default function CombatStatus() {
  const { inFight, fightDuration, totalDamage, staggerCount } =
    useCombatMonitorStore();

  const [dps, setDps] = useState(0);

  const durationInSec = fightDuration();
  const durationStr = `${fillZero(Math.floor(durationInSec / 60), 2)}:${fillZero(Math.round(durationInSec) % 60, 2)}`;

  useEffect(() => {
    if (inFight) {
      setDps(totalDamage / durationInSec);
    }
  }, [inFight, totalDamage, durationInSec]);

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
          <IndicatorCaption>Total Dmg</IndicatorCaption>
          <span className={damageStyle}>{totalDamage}</span>
        </Indicator>
        <Indicator>
          <IndicatorCaption>DPS</IndicatorCaption>
          <span className={damageStyle}>{Math.round(dps)}</span>
        </Indicator>

        <Indicator>
          <IndicatorCaption>Stagger Count</IndicatorCaption>
          {staggerCount > 0 ? staggerCount : '-'}
        </Indicator>
        <Indicator>
          <IndicatorCaption>Stagger Avg</IndicatorCaption>
          {staggerCount > 0 ? Math.round(fightDuration() / staggerCount) : '-'}s
        </Indicator>
      </div>
    </>
  );
}
