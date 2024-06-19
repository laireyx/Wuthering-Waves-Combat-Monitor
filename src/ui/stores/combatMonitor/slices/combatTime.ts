import { StateCreator } from 'zustand';

import type { CombatTimeSlice, CombatMonitorStore } from '../types';

export const createCombatTimeSlice: StateCreator<
  CombatMonitorStore,
  [],
  [],
  CombatTimeSlice
> = (_, get) => ({
  fightStart: -1,
  fightEnd: -1,

  pauseStart: -1,
  totalPause: 0,

  pauseDuration: () => {
    const { status, pauseStart, totalPause } = get();

    return (
      totalPause + (status === 'inFightPaused' ? Date.now() - pauseStart : 0)
    );
  },

  fightDuration: () => {
    const { inFight, fightStart, fightEnd, pauseDuration } = get();

    return (inFight() ? Date.now() : fightEnd) - fightStart - pauseDuration();
  },

  calcAccBuffTime: (buffKey) => {
    const { fightBuffs, pauseDuration } = get();

    const targetBuff = fightBuffs[buffKey];
    if (!targetBuff) return 0;

    const accumulatedTime = targetBuff.accumulatedTime - pauseDuration();
    return (
      accumulatedTime +
      (targetBuff.activated ? Date.now() - targetBuff.activationTime : 0)
    );
  },
});
