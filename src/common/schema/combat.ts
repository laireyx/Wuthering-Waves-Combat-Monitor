export interface CombatData {
  timestamp: string;
  type: 'Battle' | 'CombatInfo';
  msg: string;
}

export interface CombatRead {
  data: CombatData[];
  position: number;
}
