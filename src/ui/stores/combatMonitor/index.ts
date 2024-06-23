import { create } from 'zustand';

import { createCombatCharacterStatusSlice } from './slices/characterStatus';
import { createCombatGlobalStatusSlice } from './slices/globalStatus';
import { createCombatLogHandlerSlice } from './slices/logHandler';
import { CombatMonitorStore } from './types';

const useCombatMonitorStore = create<CombatMonitorStore>(
  (set, get, ...rest) => ({
    ...createCombatCharacterStatusSlice(set, get, ...rest),
    ...createCombatGlobalStatusSlice(set, get, ...rest),
    ...createCombatLogHandlerSlice(set, get, ...rest),
  }),
);

export default useCombatMonitorStore;
