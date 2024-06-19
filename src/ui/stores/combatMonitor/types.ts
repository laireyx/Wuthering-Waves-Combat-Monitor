import { CombatInfoLog, UiCoreLog } from '@common/types/logReader';
import { KnownBuffs } from '@common/types/logReader/CombatInfo/buffs';

export type FightStatus = 'inFight' | 'inFightPaused' | 'idle';

export interface Buff {
  activated: boolean;
  activationTime: number;
  accumulatedTime: number;
}

export interface CombatStatusSlice {
  status: FightStatus;

  setFightStatus: (opts: { inFight: boolean; timestamp: string }) => void;
  inFight: () => boolean;

  // Should reset these values when fight started.
  fightBuffs: Record<string, Buff>;
  totalDamage: number;
  staggerCount: number;
  qteCount: number;
  hitCount: number;

  appendBuffLog: (log: CombatInfoLog) => void;
  appendStateMachineLog: (log: CombatInfoLog) => void;
  appendSkillLog: (log: CombatInfoLog) => void;
  appendHitLog: (log: CombatInfoLog) => void;

  appendPlayInterfaceLog: (log: UiCoreLog) => void;
}

export interface CombatTimeSlice {
  fightStart: number;
  fightEnd: number;

  pauseStart: number;
  totalPause: number;

  pauseDuration: () => number;
  fightDuration: () => number;
  calcAccBuffTime: (buffKey: keyof KnownBuffs) => number;
}

export interface CombatMonitorStore
  extends CombatStatusSlice,
    CombatTimeSlice {}
