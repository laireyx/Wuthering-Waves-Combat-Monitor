import CharacterInfo from './CharacterInfo';
import { useResource } from '../../../../hooks/useResource';
import useCombatMonitorStore from '../../../../stores/combatMonitor';

import { combatCharacterTitleStyle, combatCharactersStyle } from './index.css';

export default function CombatCharacters() {
  const strings = useResource<ApplicationStrings>('strings');

  const { characters, fightDuration } = useCombatMonitorStore();

  return (
    fightDuration() > 0 && (
      <>
        <p className={combatCharacterTitleStyle}>
          {strings.characterStatusTitle}
        </p>
        <div className={combatCharactersStyle}>
          {Object.keys(characters).map((characterName) => (
            <CharacterInfo key={characterName} characterName={characterName} />
          ))}
        </div>
      </>
    )
  );
}
