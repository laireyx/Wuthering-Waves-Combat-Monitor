export interface LogLineMatchResult {
  timestamp: string;
  type: 'Battle' | 'CombatInfo';
  msg: string;

  [key: string]: string;
}
