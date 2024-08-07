import useCharacterIcon from './hooks/useCharacterIcon';
import useRealCharacterName from './hooks/useRealCharacterName';
import { useResource } from '../../../../hooks/useResource';
import useCombatMonitorStore from '../../../../stores/combatMonitor';
import Foldable from '../Foldable';
import Indicator from '../Indicator';
import IndicatorCaption from '../Indicator/Caption';

import {
  characterDetailsStyle,
  characterIconStyle,
  characterNameStyle,
} from './index.css';

interface CharacterInfoProps {
  characterName: string;
}

export default function CharacterInfo({ characterName }: CharacterInfoProps) {
  const buffs = useResource<KnownBuffs>('buffs');
  const strings = useResource<ApplicationStrings>('strings');

  const { characters, fightDuration, getActualBuffUptimeOfCharacter } =
    useCombatMonitorStore();

  const characterIcon = useCharacterIcon(characterName);
  const realCharacterName = useRealCharacterName(characterName);

  const { buffRecord, hitCount, qteCount } = characters[characterName];
  const buffIds = Object.keys(buffRecord);

  return (
    <Foldable
      title={
        <>
          <span className={characterNameStyle}>
            <img src={characterIcon} className={characterIconStyle} />
            {realCharacterName}
          </span>
        </>
      }
    >
      <div className={characterDetailsStyle}>
        <Indicator>
          <IndicatorCaption>{strings.hitCountLabel}</IndicatorCaption>
          {hitCount}
        </Indicator>
        <Indicator>
          <IndicatorCaption>{strings.qteCountLabel}</IndicatorCaption>
          {qteCount}
        </Indicator>
        {buffIds.map((buffId) => (
          <Indicator key={buffId}>
            <IndicatorCaption>{buffs[buffId].buffName}</IndicatorCaption>
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
