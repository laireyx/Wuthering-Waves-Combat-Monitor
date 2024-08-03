import ProtoCharacterNameMap from '@common/resources/prototype/characters';

import charIcons from '../../../../../assets/charIcons';

function isValidMatchResult(
  matchResult: string,
): matchResult is keyof KnownCharacterNameMap {
  return matchResult in ProtoCharacterNameMap;
}

export default function useCharacterIcon(characterName: string) {
  const matchResult = characterName.match(/BP_(.*?)_/)?.[1] ?? characterName;
  if (!isValidMatchResult(matchResult)) return 'N/A';

  return charIcons[matchResult];
}
