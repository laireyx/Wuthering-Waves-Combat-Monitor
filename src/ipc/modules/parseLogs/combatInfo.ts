import { CombatInfoLog } from '@common/types/logReader';

import parseEntity from '../parse/entity/parseEntity';
import { LogLineMatchResult } from '../types';

function validatePartMatchResult(
  matchGroup?: Record<string, string>,
): matchGroup is {
  tagName: string;
  lifeValue: string;
} {
  return !!(matchGroup?.tagName && matchGroup?.lifeValue);
}

export default function parseCombatInfoLog({
  timestamp,
  seq,
  msg,
}: LogLineMatchResult): CombatInfoLog | undefined {
  if (msg.startsWith('[Ai]')) {
    const entity = parseEntity(msg);

    if (!entity) return;

    return {
      timestamp,
      type: 'CombatInfo',
      seq: parseInt(seq),
      msg,
      data: {
        type: 'Ai',
        entity,
      },
    };
  }

  if (msg.startsWith('[Buff]')) {
    const [, buffId] = msg.match(/\[buffId:(.*?)\]/) ?? [];
    const entity = parseEntity(msg);

    if (!buffId || !entity) return;

    return {
      timestamp,
      type: 'CombatInfo',
      seq: parseInt(seq),
      msg,
      data: {
        type: 'Buff',
        entity,
        buffId: parseInt(buffId),
      },
    };
  }

  if (msg.startsWith('[Part]')) {
    const { groups } =
      msg.match(
        /UpdatePartInfo \[TagName: (?<tagName>.*?)\]\[Activated: .*?\]\[LifeValue: (?<lifeValue>.*?)\]/,
      ) ?? {};
    const entity = parseEntity(msg);

    if (!validatePartMatchResult(groups) || !entity) return;
    const { tagName, lifeValue } = groups;

    return {
      timestamp,
      type: 'CombatInfo',
      seq: parseInt(seq),
      msg,
      data: {
        type: 'Part',
        entity,
        tagName,
        lifeValue: parseInt(lifeValue),
      },
    };
  }

  /**
   * @todo implement Skill parsing
   * [Skill][EntityId:10534:Player:BP_Anke_C_2147405541] CharacterSkillComponent.RequestEndSkill [结束技能ID: 200001][结束技能名称: 变身幻象][Reason: GameplayAbilityVisionMorph.MorphEnd][CanInterrupt: false][ReadyEnd: false]
   */
}

// [DeathComponent]执行角色死亡逻辑 [Entity: [object WorldEntity(Id=232456193)]][PbDataId: 109800112]
