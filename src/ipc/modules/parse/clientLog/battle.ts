import { BattleLog } from '@common/types/logReader';

import { LogLineMatchResult } from '../../types';

export default function parseBattleLog({
  timestamp,
  seq,
  msg,
}: LogLineMatchResult): BattleLog | undefined {
  if (msg.startsWith('NotifyInFight')) {
    const matchResult = msg.match(/NotifyInFight: (true|false)/);

    const [, inFight] = matchResult ?? [];
    if (!inFight) return;

    return {
      timestamp,
      type: 'Battle',
      seq: parseInt(seq),
      msg,
      data: {
        type: 'NotifyInFight',
        inFight: inFight === 'true',
      },
    };
  }

  if (msg.startsWith('[DeathComponent]')) {
    const matchResult = msg.match(
      /\[Entity: \[object WorldEntity\(Id=(\d+)\)\]\]/,
    );

    const [, entityId] = matchResult ?? [];
    if (!entityId) return;

    return {
      timestamp,
      type: 'Battle',
      seq: parseInt(seq),
      msg,
      data: {
        type: 'DeathComponent',
        entityId: parseInt(entityId),
      },
    };
  }
}

// [DeathComponent]执行角色死亡逻辑 [Entity: [object WorldEntity(Id=232456193)]][PbDataId: 109800112]
