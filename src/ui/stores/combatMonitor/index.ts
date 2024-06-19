import { create } from 'zustand';

import { createCombatStatusSlice } from './slices/combatStatus';
import { createCombatTimeSlice } from './slices/combatTime';
import { CombatMonitorStore } from './types';

const useCombatMonitorStore = create<CombatMonitorStore>(
  (set, get, ...rest) => ({
    ...createCombatStatusSlice(set, get, ...rest),
    ...createCombatTimeSlice(set, get, ...rest),
  }),
);

export default useCombatMonitorStore;
