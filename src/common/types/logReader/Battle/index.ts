import { ClientLogImpl } from '../ClientLog';

/** Data */
export interface BattleLogDataNotifyInFight {
  type: 'NotifyInFight';
  inFight: boolean;
}

export interface BattleLogDataDeathComponent {
  type: 'DeathComponent';
  entityId: number;
}

export interface BattleLogDataUnknown {
  type: 'Unknown';
}

/** Log */
export interface BattleLog extends ClientLogImpl {
  type: 'Battle';

  data:
    | BattleLogDataNotifyInFight
    | BattleLogDataDeathComponent
    | BattleLogDataUnknown;
}
