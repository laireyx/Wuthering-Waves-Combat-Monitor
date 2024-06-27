import { StateCreator } from 'zustand';

import parseTimestamp from '../../../utils/parseTimestamp';

import type { CombatGlobalStatusSlice, CombatMonitorStore } from '../types';

export const createCombatGlobalStatusSlice: StateCreator<
  CombatMonitorStore,
  [],
  [],
  CombatGlobalStatusSlice
> = (set, get) => ({
  status: 'idle',
  partyBuffRecord: {},

  setFightStatus: ({ inFight, timestamp }) => {
    if (inFight === true) {
      const { status: prevStatus, fightEnd: prevFightEnd } = get();

      // already in fight
      if (prevStatus !== 'idle') return;

      // continuous battle
      if (parseTimestamp(timestamp) - prevFightEnd < 1000) {
        return set({
          status: inFight ? 'inFight' : 'idle',
        });
      }

      set({
        status: inFight ? 'inFight' : 'idle',
        fightStart: parseTimestamp(timestamp),
        fightEnd: -1,
        pauseStart: -1,
        totalPause: 0,

        characters: {},
        staggerCount: 0,
      });
    } else {
      set(
        ({
          clearAllCharacterBuffs,
          clearAllPartyBuffs,
          status: prevStatus,
        }) => {
          clearAllCharacterBuffs(timestamp);
          clearAllPartyBuffs(timestamp);

          // already idle
          if (prevStatus === 'idle') return {};

          return {
            status: inFight ? 'inFight' : 'idle',
            fightEnd: parseTimestamp(timestamp),
          };
        },
      );
    }
  },

  inFight: () => {
    const { status } = get();
    return status !== 'idle';
  },

  staggerCount: 0,
  qteCount: 0,

  fightStart: -1,
  fightEnd: -1,

  pauseStart: -1,
  totalPause: 0,

  pauseDuration: (moment = Date.now()) => {
    const { status, pauseStart, totalPause } = get();

    return totalPause + (status === 'inFightPaused' ? moment - pauseStart : 0);
  },

  fightDuration: (moment = Date.now()) => {
    const { inFight, fightStart, fightEnd, pauseDuration } = get();

    return (inFight() ? moment : fightEnd) - fightStart - pauseDuration(moment);
  },

  applyBuffToParty: (buffId, timestamp) =>
    set(({ partyBuffRecord }) => {
      const { accumulatedTime } = partyBuffRecord[buffId] ?? {
        accumulatedTime: 0,
      };

      partyBuffRecord[buffId] = {
        activated: true,
        activationTime: parseTimestamp(timestamp),
        accumulatedTime,
      };

      return { partyBuffRecord: { ...partyBuffRecord } };
    }),

  removeBuffFromParty: (buffId, timestamp) =>
    set(({ partyBuffRecord }) => {
      const { activated, activationTime, accumulatedTime } = partyBuffRecord[
        buffId
      ] ?? {
        activated: false,
        accumulatedTime: 0,
      };

      // buff removed, but not activated in this combat.
      // skip it because we've already finished it before.
      if (!activated) return {};

      const currentActivation = parseTimestamp(timestamp) - activationTime;

      partyBuffRecord[buffId] = {
        activated: false,
        activationTime,
        accumulatedTime: accumulatedTime + currentActivation,
      };

      return { partyBuffRecord: { ...partyBuffRecord } };
    }),

  clearAllPartyBuffs: (timestamp) =>
    set(({ partyBuffRecord }) => {
      for (const buffName in partyBuffRecord) {
        const { activated, activationTime, accumulatedTime } =
          partyBuffRecord[buffName];

        if (activated) {
          partyBuffRecord[buffName] = {
            activated: false,
            activationTime,
            accumulatedTime:
              accumulatedTime + parseTimestamp(timestamp) - activationTime,
          };
        }
      }

      return { partyBuffRecord: { ...partyBuffRecord } };
    }),

  adjustPausedPartyBuffTimes: (pausedTime) =>
    set(({ partyBuffRecord }) => {
      for (const buffName in partyBuffRecord) {
        const { activated, activationTime, accumulatedTime } =
          partyBuffRecord[buffName];

        if (activated) {
          partyBuffRecord[buffName] = {
            activated,
            activationTime,
            accumulatedTime: accumulatedTime - pausedTime,
          };
        }
      }

      return { partyBuffRecord: { ...partyBuffRecord } };
    }),

  getActualBuffUptimeOfParty: (buffId, moment = Date.now()) => {
    const { partyBuffRecord, status, pauseStart } = get();

    const targetBuff = partyBuffRecord[buffId];
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
