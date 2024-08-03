import { StateCreator } from 'zustand';

import ProtoBuffMap from '@common/resources/prototype/buffs';

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
    const {
      inFight,
      applyBuffToCharacter,
      removeBuffFromCharacter,
      applyBuffToParty,
      removeBuffFromParty,
    } = get();

    if (!inFight()) return;
    if (data.type !== 'Buff') return;

    const { addOrRemove, buffId, entity } = data;

    if (entity.type !== 'Proto_Player') return;
    if (!(buffId in ProtoBuffMap)) return;

    const { isPartyBuff } = ProtoBuffMap[buffId as keyof KnownBuffMap];

    if (isPartyBuff) {
      if (addOrRemove === 'add') applyBuffToParty(buffId, timestamp);
      else removeBuffFromParty(buffId, timestamp);
    } else {
      if (addOrRemove === 'add')
        applyBuffToCharacter(entity.name, buffId, timestamp);
      else removeBuffFromCharacter(entity.name, buffId, timestamp);
    }
  },

  appendHitLog: ({ data }) => {
    if (data.type !== 'Hit') return;
    if (data.entity.type !== 'Proto_Player') return;

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
    const {
      status,
      adjustPausedCharacterBuffTimes,
      adjustPausedPartyBuffTimes,
    } = get();

    if (data.type !== 'PlayInterfaceAnimation') return;

    if (
      status === 'inFight' &&
      data.sequenceName === 'Start' &&
      data.viewName !== 'BattleView' &&
      data.viewName !== 'ItemHintView' &&
      data.viewName !== 'SoundAreaPlayTips' &&
      data.viewName !== 'CountDownFloatTips'
    ) {
      set({ pauseStart: parseTimestamp(timestamp), status: 'inFightPaused' });
    } else if (
      status === 'inFightPaused' &&
      data.viewName === 'BattleView' &&
      (data.sequenceName === 'Start' || data.sequenceName === 'ShowView')
    ) {
      set(({ pauseStart, totalPause }) => {
        const pausedTime = parseTimestamp(timestamp) - pauseStart;
        adjustPausedCharacterBuffTimes(pausedTime);
        adjustPausedPartyBuffTimes(pausedTime);

        return {
          status: 'inFight',
          totalPause: totalPause + pausedTime,
        };
      });
    }
  },
});
