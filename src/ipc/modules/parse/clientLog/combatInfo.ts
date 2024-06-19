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
  buffReason?: string;
  handle?: string;
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

function validateSkillMatchResult(
  matchGroup?: Record<string, string>,
): matchGroup is {
  skillId: string;
  skillName: string;
} {
  return !!(matchGroup?.skillId && matchGroup?.skillName);
}

function validateFinalSkillMatchResult(
  matchGroup?: Record<string, string>,
): matchGroup is {
  finalSkillId: string;
  finalSkillName: string;
  canInterrupt: string;
} {
  return !!(
    matchGroup?.finalSkillId &&
    matchGroup?.finalSkillName &&
    matchGroup?.canInterrupt
  );
}

function validateHitMatchResult(
  matchGroup?: Record<string, string>,
): matchGroup is {
  beHitAnim: string;
} {
  return !!matchGroup?.beHitAnim;
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
        /本地(?<addOrRemove>添加|移除)buff \[buffId:(?<buffId>.*?)\](\[创建者id: (?<buffCreatorId>.*?)\])?\[持有者: (?<buffTargetId>.*?)\].*?\[原因: (?<buffReason>.*?)\].*?\[handle: (?<handle>.*?)\].*?\[说明: (?<buffDescription>.*?)\]/,
      ) ?? {};

    const entity = parseEntity(msg);

    if (!validateBuffMatchResult(groups) || !entity) return;

    const {
      addOrRemove,
      buffId,
      buffCreatorId,
      buffTargetId,
      buffDescription,
      buffReason,
      handle,
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
        buffReason,
        handle: handle ? parseInt(handle) : undefined,
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

    if (!entity) return;
    const { fromState, toState } = groups ?? {};

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

  if (msg.startsWith('[Skill]')) {
    const entity = parseEntity(msg);
    const [, phase] =
      msg.match(
        /CharacterSkillComponent.(BeginSkill|RequestEndSkill|DoSkillEnd)/,
      ) ?? [];

    if (!entity) return;

    const { groups } =
      msg.match(
        /\[技能Id: (?<skillId>.*?)\].*?\[技能名: (?<skillName>.*?)\]|\[结束技能ID: (?<finalSkillId>.*?)\].*?\[结束技能名称: (?<finalSkillName>.*?)\].*?\[CanInterrupt: (?<canInterrupt>true|false)\]/,
      ) ?? {};

    switch (phase) {
      case 'BeginSkill':
        if (validateSkillMatchResult(groups))
          return {
            timestamp,
            type: 'CombatInfo',
            seq: parseInt(seq),
            msg,
            data: {
              type: 'Skill',
              entity,
              characterSkillComponent: {
                phase,
                skillId: parseInt(groups.skillId),
                skillName: groups.skillName,
              },
            },
          };
        break;
      case 'RequestEndSkill':
        if (validateFinalSkillMatchResult(groups))
          return {
            timestamp,
            type: 'CombatInfo',
            seq: parseInt(seq),
            msg,
            data: {
              type: 'Skill',
              entity,
              characterSkillComponent: {
                phase,
                finalSkillId: parseInt(groups.finalSkillId),
                finalSkillName: groups.finalSkillName,
                canInterrupt: groups.canInterrupt === 'true',
              },
            },
          };
        break;
      case 'DoSkillEnd':
        if (validateSkillMatchResult(groups))
          return {
            timestamp,
            type: 'CombatInfo',
            seq: parseInt(seq),
            msg,
            data: {
              type: 'Skill',
              entity,
              characterSkillComponent: {
                phase,
                skillId: parseInt(groups.skillId),
                skillName: groups.skillName,
              },
            },
          };
    }
  }

  if (msg.startsWith('[Hit]')) {
    const { groups } = msg.match(/\[BeHitAnim: (?<beHitAnim>\d+)\]/) ?? {};
    const entity = parseEntity(msg);

    if (!entity) return;
    if (!validateHitMatchResult(groups)) return;

    const { beHitAnim } = groups;

    return {
      timestamp,
      type: 'CombatInfo',
      seq: parseInt(seq),
      msg,
      data: {
        type: 'Hit',
        entity,
        beHitAnim: parseInt(beHitAnim),
      },
    };
  }
}

// [DeathComponent]执行角色死亡逻辑 [Entity: [object WorldEntity(Id=232456193)]][PbDataId: 109800112]
