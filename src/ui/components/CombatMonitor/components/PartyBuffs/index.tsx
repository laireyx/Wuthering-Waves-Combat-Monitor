import {
  KnownBuffMap,
  KnownBuffs,
} from '@common/types/logReader/CombatInfo/buffs';

import useCombatMonitorStore from '../../../../stores/combatMonitor';
import Indicator from '../Indicator';
import IndicatorCaption from '../Indicator/Caption';

import { partyBuffStyle, partyBuffTitleStyle } from './index.css';

export default function PartyBuffs() {
  const { fightDuration, partyBuffRecord, getActualBuffUptimeOfParty } =
    useCombatMonitorStore();
  const buffIds = Object.keys(partyBuffRecord) as (keyof KnownBuffs)[];

  return (
    <>
      <p className={partyBuffTitleStyle}>Party Buffs</p>
      <div className={partyBuffStyle}>
        {buffIds.map((buffId) => (
          <Indicator key={buffId}>
            <IndicatorCaption>{KnownBuffMap[buffId].buffName}</IndicatorCaption>
            {Math.round(
              (getActualBuffUptimeOfParty(buffId) / fightDuration()) * 100,
            )}
            %
          </Indicator>
        ))}
      </div>
    </>
  );
}
