export interface LogLineMatchResult {
  timestamp: string;
  type: 'Battle' | 'CombatInfo';
  seq: string;
  msg: string;

  [key: string]: string;
}
