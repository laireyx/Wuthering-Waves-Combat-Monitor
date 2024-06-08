import { CombatInfoLog } from '@common/types/logReader';

import { LogLineMatchResult } from '../../types';
import parseEntity from '../entity/parseEntity';

function validateBuffMatchResult(
  matchGroup?: Record<string, string>,
): matchGroup is {
  /** '添加' means add, '移除' means remove */
  addOrRemove: '添加' | '移除';
  buffId: string;
  buffCreatorId?: string;
  buffTargetId: string;
  buffDescription: string;
} {
  return !!(
    matchGroup?.addOrRemove &&
    matchGroup?.buffId &&
    matchGroup?.buffTargetId &&
    matchGroup?.buffDescription
  );
}

function validatePartMatchResult(
  matchGroup?: Record<string, string>,
): matchGroup is {
  tagName: string;
  lifeValue: string;
} {
  return !!(matchGroup?.tagName && matchGroup?.lifeValue);
}

function validateStateMachineMatchResult(
  matchGroup?: Record<string, string>,
): matchGroup is {
  fromState: string;
  toState: string;
} {
  return !!(matchGroup?.fromState && matchGroup?.toState);
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
    const { groups } =
      msg.match(
        /本地(?<addOrRemove>添加|移除)buff \[buffId:(?<buffId>.*?)\](\[创建者id: (?<buffCreatorId>.*?)\])?\[持有者: (?<buffTargetId>.*?)\].*?\[说明: (?<buffDescription>.*?)\]/,
      ) ?? {};

    const entity = parseEntity(msg);

    if (!validateBuffMatchResult(groups) || !entity) return;

    const {
      addOrRemove,
      buffId,
      buffCreatorId,
      buffTargetId,
      buffDescription,
    } = groups;

    return {
      timestamp,
      type: 'CombatInfo',
      seq: parseInt(seq),
      msg,
      data: {
        type: 'Buff',
        entity,
        addOrRemove: addOrRemove === '添加' ? 'add' : 'remove',
        buffId: parseInt(buffId),
        buffCreatorId: buffCreatorId ? parseInt(buffCreatorId) : undefined,
        buffTargetId: parseInt(buffTargetId),
        buffDescription,
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

  if (msg.startsWith('[StateMachineNew]')) {
    const { groups } =
      msg.match(/\[from: (?<fromState>.*?)\]\[to: (?<toState>.*?)\]/) ?? {};
    const entity = parseEntity(msg);

    if (!validateStateMachineMatchResult(groups) || !entity) return;
    const { fromState, toState } = groups;

    return {
      timestamp,
      type: 'CombatInfo',
      seq: parseInt(seq),
      msg,
      data: {
        type: 'StateMachineNew',
        entity,
        fromState,
        toState,
      },
    };
  }

  /**
   * @todo implement Skill parsing
   * [Skill][EntityId:10534:Player:BP_Anke_C_2147405541] CharacterSkillComponent.RequestEndSkill [结束技能ID: 200001][结束技能名称: 变身幻象][Reason: GameplayAbilityVisionMorph.MorphEnd][CanInterrupt: false][ReadyEnd: false]
   */
}

// [DeathComponent]执行角色死亡逻辑 [Entity: [object WorldEntity(Id=232456193)]][PbDataId: 109800112]
