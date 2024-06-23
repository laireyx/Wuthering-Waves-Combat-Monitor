import {
  KnownBuffMap,
  KnownBuffs,
} from '@common/types/logReader/CombatInfo/buffs';

import useCombatMonitorStore from '../../../../stores/combatMonitor';
import Foldable from '../Foldable';
import Indicator from '../Indicator';
import IndicatorCaption from '../Indicator/Caption';

import { characterDetailsStyle } from './index.css';

interface CharacterInfoProps {
  characterName: string;
}

export default function CharacterInfo({ characterName }: CharacterInfoProps) {
  const { characters, fightDuration, getActualBuffUptimeOfCharacter } =
    useCombatMonitorStore();
  const { buffRecord, hitCount, qteCount } = characters[characterName];
  const buffIds = Object.keys(buffRecord) as (keyof KnownBuffs)[];

  return (
    <Foldable title={characterName}>
      <div className={characterDetailsStyle}>
        <Indicator>
          <IndicatorCaption>Hit Count</IndicatorCaption>
          {hitCount}
        </Indicator>
        <Indicator>
          <IndicatorCaption>QTE Count</IndicatorCaption>
          {qteCount}
        </Indicator>
        {buffIds.map((buffId) => (
          <Indicator key={buffId}>
            <IndicatorCaption>{KnownBuffMap[buffId].buffName}</IndicatorCaption>
            {Math.round(
              (getActualBuffUptimeOfCharacter(characterName, buffId) /
                fightDuration()) *
                100,
            )}
            %
          </Indicator>
        ))}
      </div>
    </Foldable>
  );
}
