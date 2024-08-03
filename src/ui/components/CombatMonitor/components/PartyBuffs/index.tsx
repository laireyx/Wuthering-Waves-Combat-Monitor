import { useResource } from '../../../../hooks/useResource';
import useCombatMonitorStore from '../../../../stores/combatMonitor';
import Indicator from '../Indicator';
import IndicatorCaption from '../Indicator/Caption';

import { partyBuffStyle, partyBuffTitleStyle } from './index.css';

export default function PartyBuffs() {
  const buffs = useResource<KnownBuffs>('buffs');
  const strings = useResource<ApplicationStrings>('strings');

  const { fightDuration, partyBuffRecord, getActualBuffUptimeOfParty } =
    useCombatMonitorStore();
  const buffIds = Object.keys(partyBuffRecord);

  return (
    <>
      <p className={partyBuffTitleStyle}>{strings.partyBuffsTitle}</p>
      <div className={partyBuffStyle}>
        {buffIds.map((buffId) => (
          <Indicator key={buffId}>
            <IndicatorCaption>{buffs[buffId].buffName}</IndicatorCaption>
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
