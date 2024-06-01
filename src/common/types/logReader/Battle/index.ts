import { ClientLog } from '../ClientLog';

/** Data */
export interface BattleLogData {
  type: 'NotifyInFight' | 'DeathComponent' | (string & Record<never, never>);
}

export interface BattleLogNotifyInFight extends BattleLogData {
  type: 'NotifyInFight';
  inFight: boolean;
}

export interface BattleLogDeathComponent extends BattleLogData {
  type: 'DeathComponent';
  entityId: number;
}

/** Log */
export interface BattleLog extends ClientLog {
  type: 'Battle';

  data: BattleLogNotifyInFight | BattleLogDeathComponent | BattleLogData;
}
