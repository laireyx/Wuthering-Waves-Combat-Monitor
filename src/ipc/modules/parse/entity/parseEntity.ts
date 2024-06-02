import { Entity } from '@common/types/logReader/Entity';

function validateMatchResult(
  matchGroup?: Record<string, string>,
): matchGroup is {
  id: string;
  type: Entity['type'];
  name: Entity['name'];
} {
  return !!(matchGroup?.id && matchGroup?.type && matchGroup?.name);
}

export default function parseEntity(msg: string) {
  const { groups } =
    msg.match(
      /\[EntityId:(?<id>.*?):(?<type>Animal|Npc|Player|Vision|Monster|.*?):(?<name>[^\]]*?)\]/,
    ) ?? {};

  if (!validateMatchResult(groups)) return;
  const { id, type, name } = groups;

  return {
    id: parseInt(id),
    type,
    name,
  };
}
