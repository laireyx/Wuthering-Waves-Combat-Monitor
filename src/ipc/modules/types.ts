export interface LogLineMatchResult {
  timestamp: string;
  type: 'Battle' | 'CombatInfo' | 'UiCore';
  seq: string;
  msg: string;

  [key: string]: string;
}
