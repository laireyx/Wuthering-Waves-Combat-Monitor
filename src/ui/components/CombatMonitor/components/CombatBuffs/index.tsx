import {
  KnownBuffMap,
  KnownBuffs,
} from '@common/types/logReader/CombatInfo/buffs';

import useCombatMonitorStore from '../../../../stores/combatMonitor';
import Indicator from '../Indicator';
import IndicatorCaption from '../Indicator/Caption';

import { combatBuffTitleStyle, combatBuffsStyle } from './index.css';

export default function CombatBuffs() {
  const { fightBuffs, fightDuration, calcAccBuffTime } =
    useCombatMonitorStore();

  const buffKeys = Object.keys(fightBuffs) as (keyof KnownBuffs)[];

  return (
    fightDuration() > 0 && (
      <>
        <p className={combatBuffTitleStyle}>Buff Uptimes</p>
        <div className={combatBuffsStyle}>
          {buffKeys.map((buffKey) => (
            <Indicator key={buffKey}>
              <IndicatorCaption>
                {KnownBuffMap[buffKey].buffName}
              </IndicatorCaption>
              {Math.round(
                (calcAccBuffTime(buffKey) / 1000 / fightDuration()) * 100,
              )}
              %
            </Indicator>
          ))}
        </div>
      </>
    )
  );
}
