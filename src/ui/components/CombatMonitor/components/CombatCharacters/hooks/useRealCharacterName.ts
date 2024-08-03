import ProtoCharacterNameMap from '@common/resources/prototype/characters';

import { useResource } from '../../../../../hooks/useResource';

function isValidMatchResult(
  matchResult: string,
): matchResult is keyof KnownCharacterNameMap {
  return matchResult in ProtoCharacterNameMap;
}

export default function useRealCharacterName(characterName: string) {
  const characterNames = useResource<KnownCharacterNameMap>('characters');

  const matchResult = characterName.match(/BP_(.*?)_/)?.[1] ?? characterName;
  if (!isValidMatchResult(matchResult)) return 'N/A';

  return characterNames[matchResult];
}
