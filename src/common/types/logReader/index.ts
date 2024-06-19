import { ClientLog } from './ClientLog';

export interface LogReadResult {
  data: ClientLog[];
  position: number;
}

export * from './Battle';
export * from './CombatInfo';
export * from './UiCore';
export * from './ClientLog';
