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

  setFightStatus: ({ inFight, timestamp }) => {
    if (inFight === true) {
      const { fightEnd: prevFightEnd } = get();

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
      set(({ clearAllBuffs }) => {
        clearAllBuffs(timestamp);

        return {
          status: inFight ? 'inFight' : 'idle',
          fightEnd: parseTimestamp(timestamp),
        };
      });
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
});
