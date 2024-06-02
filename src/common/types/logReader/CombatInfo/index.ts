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
  buffId: number;
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
    | CombatInfoLogDataUnknown;
}
