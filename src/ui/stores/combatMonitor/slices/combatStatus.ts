import { StateCreator } from 'zustand';

import { KnownBuffKeys } from '@common/types/logReader/CombatInfo/buffs';

import parseTimestamp from '../../../utils/parseTimestamp';

import type { CombatStatusSlice, CombatMonitorStore, Buff } from '../types';

export const createCombatStatusSlice: StateCreator<
  CombatMonitorStore,
  [],
  [],
  CombatStatusSlice
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

        fightBuffs: {},
        totalDamage: 0,
        staggerCount: 0,
        qteCount: 0,
        hitCount: 0,
      });
    } else {
      set(({ fightBuffs }) => {
        // finish all active buffs
        const finishedBuffs = Object.fromEntries(
          Object.entries(fightBuffs).map(
            ([k, { activated, activationTime, accumulatedTime }]) => {
              if (!activated)
                return [
                  k,
                  {
                    activated,
                    activationTime,
                    accumulatedTime,
                  } satisfies Buff,
                ];

              const currentActivation =
                parseTimestamp(timestamp) - activationTime;

              return [
                k,
                {
                  activated: false,
                  activationTime,
                  accumulatedTime: accumulatedTime + currentActivation,
                } satisfies Buff,
              ];
            },
          ),
        );

        return {
          status: inFight ? 'inFight' : 'idle',
          fightEnd: parseTimestamp(timestamp),
          fightBuffs: finishedBuffs,
        };
      });
    }
  },

  inFight: () => {
    const { status } = get();
    return status !== 'idle';
  },

  fightBuffs: {},
  totalDamage: 0,
  staggerCount: 0,
  qteCount: 0,
  hitCount: 0,

  /**
   * Handles only a small number of buffs(cuz it's complex to handle all buffs; their effect varies a lot).
   */
  appendBuffLog: ({ data, timestamp }) => {
    const { inFight } = get();
    if (!inFight()) return;
    if (data.type !== 'Buff') return;

    const { addOrRemove, buffId } = data;

    set(({ fightBuffs }) => {
      if (!KnownBuffKeys.includes(buffId.toString())) return {};

      const { activationTime, accumulatedTime } = fightBuffs[buffId] ?? {
        activated: false,
        activationTime: parseTimestamp(timestamp),
        accumulatedTime: 0,
      };

      if (addOrRemove === 'add') {
        fightBuffs[buffId] = {
          activated: true,
          activationTime: parseTimestamp(timestamp),
          accumulatedTime,
        };
        return { fightBuffs: { ...fightBuffs } };
      }

      // buff removed, but not activated in this combat.
      // skip it because we've already finished it before.
      if (!fightBuffs[buffId]?.activated) return {};

      const currentActivation = parseTimestamp(timestamp) - activationTime;

      fightBuffs[buffId] = {
        activated: false,
        activationTime,
        accumulatedTime: accumulatedTime + currentActivation,
      };

      return { fightBuffs: { ...fightBuffs } };
    });
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

    set(({ qteCount }) => ({ qteCount: qteCount + 1 }));
  },

  appendHitLog: ({ data }) => {
    if (data.type !== 'Hit') return;
    if (data.entity.type !== 'Player') return;

    set(({ hitCount }) => ({ hitCount: hitCount + 1 }));
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
