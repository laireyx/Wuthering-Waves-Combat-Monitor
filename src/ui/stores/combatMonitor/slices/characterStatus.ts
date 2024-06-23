import { StateCreator } from 'zustand';

import parseTimestamp from '../../../utils/parseTimestamp';

import type {
  Character,
  CombatCharacterStatusSlice,
  CombatMonitorStore,
} from '../types';

export const createCombatCharacterStatusSlice: StateCreator<
  CombatMonitorStore,
  [],
  [],
  CombatCharacterStatusSlice
> = (set, get) => ({
  characters: {},

  applyBuffToCharacter: (characterName, buffId, timestamp) =>
    set(({ characters }) => {
      characters[characterName] =
        characters[characterName] ??
        ({
          buffRecord: {},
          hitCount: 0,
          qteCount: 0,
        } satisfies Character);

      const { buffRecord } = characters[characterName];

      const { accumulatedTime } = buffRecord[buffId] ?? {
        accumulatedTime: 0,
      };

      buffRecord[buffId] = {
        activated: true,
        activationTime: parseTimestamp(timestamp),
        accumulatedTime,
      };

      return { characters: { ...characters } };
    }),

  removeBuffFromCharacter: (characterName, buffId, timestamp) =>
    set(({ characters }) => {
      characters[characterName] =
        characters[characterName] ??
        ({
          buffRecord: {},
          hitCount: 0,
          qteCount: 0,
        } satisfies Character);

      const { buffRecord } = characters[characterName];

      const { activated, activationTime, accumulatedTime } = buffRecord[
        buffId
      ] ?? {
        activated: false,
        accumulatedTime: 0,
      };

      // buff removed, but not activated in this combat.
      // skip it because we've already finished it before.
      if (!activated) return {};

      const currentActivation = parseTimestamp(timestamp) - activationTime;

      buffRecord[buffId] = {
        activated: false,
        activationTime,
        accumulatedTime: accumulatedTime + currentActivation,
      };

      return { characters: { ...characters } };
    }),

  clearAllBuffs: (timestamp) =>
    set(({ characters }) => {
      for (const characterName in characters) {
        const { buffRecord } = characters[characterName];
        for (const buffName in buffRecord) {
          const { activated, activationTime, accumulatedTime } =
            buffRecord[buffName];

          if (activated) {
            buffRecord[buffName] = {
              activated: false,
              activationTime,
              accumulatedTime:
                accumulatedTime + parseTimestamp(timestamp) - activationTime,
            };
          }
        }
      }

      return { characters: { ...characters } };
    }),

  adjustPausedBuffTimes: (pausedTime) =>
    set(({ characters }) => {
      for (const characterName in characters) {
        const { buffRecord } = characters[characterName];
        for (const buffName in buffRecord) {
          const { activated, activationTime, accumulatedTime } =
            buffRecord[buffName];

          if (activated) {
            buffRecord[buffName] = {
              activated,
              activationTime,
              accumulatedTime: accumulatedTime - pausedTime,
            };
          }
        }
      }

      return { characters: { ...characters } };
    }),

  addHitCountToCharacter: (characterName) =>
    set(({ characters }) => {
      characters[characterName] =
        characters[characterName] ??
        ({
          buffRecord: {},
          hitCount: 0,
          qteCount: 0,
        } satisfies Character);

      characters[characterName].hitCount++;

      return { characters: { ...characters } };
    }),

  addQTECountToCharacter: (characterName) =>
    set(({ characters }) => {
      characters[characterName] =
        characters[characterName] ??
        ({
          buffRecord: {},
          hitCount: 0,
          qteCount: 0,
        } satisfies Character);

      characters[characterName].qteCount++;

      return { characters: { ...characters } };
    }),

  getActualBuffUptimeOfCharacter: (
    characterName,
    buffId,
    moment = Date.now(),
  ) => {
    const { characters, status, pauseStart } = get();
    const { buffRecord } = characters[characterName];

    const targetBuff = buffRecord[buffId];
    if (!targetBuff) return 0;

    const accumulatedTime = targetBuff.accumulatedTime;

    return (
      accumulatedTime +
      (targetBuff.activated ? moment - targetBuff.activationTime : 0) -
      (targetBuff.activated && status === 'inFightPaused'
        ? moment - pauseStart
        : 0)
    );
  },
});
