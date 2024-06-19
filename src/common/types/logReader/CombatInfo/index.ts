import { KnownBuffs } from './buffs';
import { ClientLogImpl } from '../ClientLog';
import { Entity } from '../Entity';

/** Data */
export interface CombatInfoLogDataAi {
  type: 'Ai';

  entity: Entity;
}

export interface CombatInfoLogDataBuff {
  type: 'Buff';

  entity: Entity;
  addOrRemove: 'add' | 'remove';
  buffId: keyof KnownBuffs | (number & Record<never, never>);
  buffCreatorId?: number;
  buffTargetId: number;
  buffDescription: string;
  buffReason?: string;
  handle?: number;
}

export interface CombatInfoLogDataPart {
  type: 'Part';

  entity: Entity;
  /** @description `弱点` means shield, I guess. */
  tagName: string;
  lifeValue: number;
}

export interface CombatInfoLogDataSkill {
  type: 'Skill';

  entity: Entity;
  characterSkillComponent:
    | {
        phase: 'BeginSkill';
        skillId: number;
        skillName: string;
      }
    | {
        phase: 'RequestEndSkill';
        finalSkillId: number;
        finalSkillName: string;
        canInterrupt: boolean;
      }
    | {
        phase: 'DoSkillEnd';
        skillId: number;
        skillName: string;
      };
}

export interface CombatInfoLogDataStateMachineNew {
  type: 'StateMachineNew';
  entity: Entity;
  fromState?: string;
  toState?: string;
}

export interface CombatInfoLogDataHit {
  type: 'Hit';

  entity: Entity;
  beHitAnim: number;
}

export interface CombatInfoLogDataUnknown {
  type: 'Unknown';
}

/** Log */
export interface CombatInfoLog extends ClientLogImpl {
  type: 'CombatInfo';

  data:
    | CombatInfoLogDataAi
    | CombatInfoLogDataBuff
    | CombatInfoLogDataPart
    | CombatInfoLogDataSkill
    | CombatInfoLogDataStateMachineNew
    | CombatInfoLogDataHit
    | CombatInfoLogDataUnknown;
}
