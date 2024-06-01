export interface ClientLog {
  timestamp: string;
  type: 'Battle' | 'CombatInfo' | (string & Record<never, never>);
  msg: string;

  data?: unknown;
}
