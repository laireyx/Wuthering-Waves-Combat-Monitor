import { CombatInfoLog, UiCoreLog } from '@common/types/logReader';

type CharacterName = string;

export type FightStatus = 'inFight' | 'inFightPaused' | 'idle';

export interface Buff {
  activated: boolean;
  activationTime: number;
  accumulatedTime: number;
}

export interface Character {
  buffRecord: Record<string, Buff>;
  hitCount: number;
  qteCount: number;
}

export interface CombatCharacterStatusSlice {
  // Should reset when fight started.
  characters: Record<CharacterName, Character>;

  applyBuffToCharacter: (
    characterName: CharacterName,
    buffId: string,
    timestamp: string,
  ) => void;

  removeBuffFromCharacter: (
    characterName: CharacterName,
    buffId: string,
    timestamp: string,
  ) => void;

  clearAllCharacterBuffs: (timestamp: string) => void;
  adjustPausedCharacterBuffTimes: (pausedTime: number) => void;

  addHitCountToCharacter: (characterName: CharacterName) => void;
  addQTECountToCharacter: (characterName: CharacterName) => void;

  getActualBuffUptimeOfCharacter: (
    characterName: string,
    buffId: string,
    moment?: number,
  ) => number;
}

export interface CombatGlobalStatusSlice {
  status: FightStatus;
  partyBuffRecord: Record<string, Buff>;

  setFightStatus: (opts: { inFight: boolean; timestamp: string }) => void;
  inFight: () => boolean;

  // Should reset these values when fight started.
  staggerCount: number;
  //

  fightStart: number;
  fightEnd: number;

  pauseStart: number;
  totalPause: number;

  pauseDuration: (moment?: number) => number;
  fightDuration: (moment?: number) => number;

  applyBuffToParty: (buffId: string, timestamp: string) => void;
  removeBuffFromParty: (buffId: string, timestamp: string) => void;

  clearAllPartyBuffs: (timestamp: string) => void;
  adjustPausedPartyBuffTimes: (pausedTime: number) => void;

  getActualBuffUptimeOfParty: (buffId: string, moment?: number) => number;
}

export interface CombatLogHandlerSlice {
  appendBuffLog: (log: CombatInfoLog) => void;
  appendHitLog: (log: CombatInfoLog) => void;
  appendStateMachineLog: (log: CombatInfoLog) => void;
  appendSkillLog: (log: CombatInfoLog) => void;
  appendPlayInterfaceLog: (log: UiCoreLog) => void;
}

export interface CombatMonitorStore
  extends CombatCharacterStatusSlice,
    CombatGlobalStatusSlice,
    CombatLogHandlerSlice {}
