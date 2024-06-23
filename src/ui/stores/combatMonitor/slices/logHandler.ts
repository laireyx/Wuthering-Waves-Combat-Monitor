import { StateCreator } from 'zustand';

import { KnownBuffKeys } from '@common/types/logReader/CombatInfo/buffs';

import parseTimestamp from '../../../utils/parseTimestamp';

import type { CombatLogHandlerSlice, CombatMonitorStore } from '../types';

export const createCombatLogHandlerSlice: StateCreator<
  CombatMonitorStore,
  [],
  [],
  CombatLogHandlerSlice
> = (set, get) => ({
  /**
   * Handles only a small number of buffs(cuz it's complex to handle all buffs; their effect varies a lot).
   */
  appendBuffLog: ({ data, timestamp }) => {
    const { inFight, applyBuffToCharacter, removeBuffFromCharacter } = get();
    if (!inFight()) return;
    if (data.type !== 'Buff') return;

    const { addOrRemove, buffId, entity } = data;

    if (entity.type !== 'Player') return;
    if (!KnownBuffKeys.includes(buffId.toString())) return;

    if (addOrRemove === 'add')
      applyBuffToCharacter(entity.name, buffId, timestamp);
    else removeBuffFromCharacter(entity.name, buffId, timestamp);
  },

  appendHitLog: ({ data }) => {
    if (data.type !== 'Hit') return;
    if (data.entity.type !== 'Player') return;

    const { addHitCountToCharacter } = get();

    addHitCountToCharacter(data.entity.name);
  },

  appendStateMachineLog: ({ data, msg }) => {
    if (data.type !== 'StateMachineNew') return;
    if (
      data.toState !== 'Boss瘫痪蒙太奇' &&
      !(data.entity.type === 'Monster' && msg.includes('[开始瘫痪]'))
    )
      return;

    set(({ staggerCount }) => ({ staggerCount: staggerCount + 1 }));
  },

  appendSkillLog: ({ data }) => {
    if (data.type !== 'Skill') return;
    if (data.characterSkillComponent.phase !== 'RequestEndSkill') return;
    if (!data.characterSkillComponent.finalSkillName.includes('QTE')) return;

    const { addQTECountToCharacter } = get();
    addQTECountToCharacter(data.entity.name);
  },

  appendPlayInterfaceLog: ({ data, timestamp }) => {
    const { status } = get();

    if (data.type !== 'PlayInterfaceAnimation') return;

    if (
      status === 'inFight' &&
      data.viewName !== 'BattleView' &&
      data.sequenceName === 'Start'
    ) {
      set({ pauseStart: parseTimestamp(timestamp), status: 'inFightPaused' });
    } else if (
      status === 'inFightPaused' &&
      data.viewName === 'BattleView' &&
      (data.sequenceName === 'Start' || data.sequenceName === 'ShowView')
    ) {
      set(({ pauseStart, totalPause }) => ({
        status: 'inFight',
        totalPause: totalPause + parseTimestamp(timestamp) - pauseStart,
      }));
    }
  },
});
