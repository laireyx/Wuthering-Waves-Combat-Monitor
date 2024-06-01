import { ClientLog } from '../ClientLog';
import { Entity } from '../Entity';

/** Data */
export interface CombatInfoLogData {
  type: 'Ai' | 'Buff' | 'Part' | 'Skill' | (string & Record<never, never>);
}

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
  /** @description `弱点` means hp, I guess. */
  tagName: string;
  lifeValue: number;
}

export interface CombatInfoLogDataSkill {
  type: 'Skill';
}

/** Log */
export interface CombatInfoLog extends ClientLog {
  type: 'CombatInfo';

  data:
    | CombatInfoLogDataAi
    | CombatInfoLogDataBuff
    | CombatInfoLogDataPart
    | CombatInfoLogDataSkill
    | CombatInfoLogData;
}
