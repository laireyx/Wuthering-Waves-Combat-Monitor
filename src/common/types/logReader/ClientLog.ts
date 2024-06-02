import { BattleLog } from './Battle';
import { CombatInfoLog } from './CombatInfo';

export interface ClientLogImpl {
  timestamp: string;
  type: 'Battle' | 'CombatInfo' | (string & Record<never, never>);
  seq: number;
  msg: string;
}

export type ClientLog = BattleLog | CombatInfoLog;
