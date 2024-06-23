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

  pauseDuration: (moment = Date.now()) => {
    const { status, pauseStart, totalPause } = get();

    return totalPause + (status === 'inFightPaused' ? moment - pauseStart : 0);
  },

  fightDuration: (moment = Date.now()) => {
    const { inFight, fightStart, fightEnd, pauseDuration } = get();

    return (inFight() ? moment : fightEnd) - fightStart - pauseDuration(moment);
  },

  calcAccBuffTime: (buffKey, moment?: number) => {
    const { fightBuffs, pauseDuration } = get();

    const targetBuff = fightBuffs[buffKey];
    if (!targetBuff) return 0;

    const accumulatedTime = targetBuff.accumulatedTime - pauseDuration(moment);

    return (
      accumulatedTime +
      (targetBuff.activated ? Date.now() - targetBuff.activationTime : 0)
    );
  },
});
