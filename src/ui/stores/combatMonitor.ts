import { create } from 'zustand';

import { CombatInfoLog } from '@common/types/logReader';
import { KnownBuffKeys } from '@common/types/logReader/CombatInfo/buffs';

import parseTimestamp from '../utils/parseTimestamp';

interface Part {
  lifeValue: number;
  accumulatedDamage: number;
}

interface Buff {
  activated: boolean;
  activationTime: number;
  accumulatedTime: number;
}

interface CombatMonitorStore {
  inFight: boolean;

  fightStart: number;
  fightEnd: number;

  // Should reset these values when fight started.
  fightParts: Record<string, Part>;
  fightBuffs: Record<string, Buff>;
  totalDamage: number;
  staggerCount: number;

  setFightStatus: (opts: { inFight: boolean; timestamp: string }) => void;
  appendPartLog: (log: CombatInfoLog) => void;
  appendBuffLog: (log: CombatInfoLog) => void;
  appendStateMachineLog: (log: CombatInfoLog) => void;

  fightDuration: () => number;
}

const useCombatMonitorStore = create<CombatMonitorStore>((set, get) => ({
  inFight: false,

  fightStart: -1,
  fightEnd: -1,

  fightParts: {},
  fightBuffs: {},
  totalDamage: 0,
  staggerCount: 0,

  setFightStatus: ({ inFight, timestamp }) => {
    if (inFight === true) {
      const { fightEnd: prevFightEnd } = get();

      // continuous battle
      if (parseTimestamp(timestamp) - prevFightEnd < 1000) {
        return set({
          inFight,
        });
      }

      set({
        inFight,
        fightStart: parseTimestamp(timestamp),
        fightEnd: -1,
        fightParts: {},
        fightBuffs: {},
        totalDamage: 0,
        staggerCount: 0,
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
          inFight,
          fightEnd: parseTimestamp(timestamp),
          fightBuffs: finishedBuffs,
        };
      });
    }
  },

  appendPartLog: ({ data }) => {
    if (data.type !== 'Part') return;

    const uniqName = `${data.entity.id}:${data.entity.name}:${data.tagName}`;

    set(({ fightParts, totalDamage }) => {
      const { lifeValue, accumulatedDamage } = fightParts[uniqName] ?? {
        lifeValue: data.lifeValue,
        accumulatedDamage: 0,
      };

      const currentDamage = lifeValue - data.lifeValue;

      fightParts[uniqName] = {
        lifeValue,
        accumulatedDamage: accumulatedDamage + currentDamage,
      };

      return {
        totalDamage: totalDamage + currentDamage,
        fightParts: { ...fightParts },
      };
    });
  },

  /**
   * Handles only a small number of buffs(cuz it's complex to handle all buffs; their effect varies a lot).
   */
  appendBuffLog: ({ data, timestamp }) => {
    const { inFight } = get();
    if (!inFight) return;
    if (data.type !== 'Buff') return;

    const { addOrRemove, buffDescription } = data;

    set(({ fightBuffs }) => {
      if (!KnownBuffKeys.includes(buffDescription)) return {};

      const { activationTime, accumulatedTime } = fightBuffs[
        buffDescription
      ] ?? {
        activated: false,
        activationTime: parseTimestamp(timestamp),
        accumulatedTime: 0,
      };

      if (addOrRemove === 'add') {
        fightBuffs[buffDescription] = {
          activated: true,
          activationTime: parseTimestamp(timestamp),
          accumulatedTime,
        };
        return { fightBuffs: { ...fightBuffs } };
      }

      // buff removed, but not activated in this combat.
      // skip it because we've already finished it before.
      if (!fightBuffs[buffDescription]?.activated) return {};

      const currentActivation = parseTimestamp(timestamp) - activationTime;

      fightBuffs[buffDescription] = {
        activated: false,
        activationTime,
        accumulatedTime: accumulatedTime + currentActivation,
      };

      return { fightBuffs: { ...fightBuffs } };
    });
  },

  appendStateMachineLog: ({ data }) => {
    if (data.type !== 'StateMachineNew') return;
    if (data.toState !== 'Boss瘫痪蒙太奇') return;

    set(({ staggerCount }) => ({ staggerCount: staggerCount + 1 }));
  },

  fightDuration: () => {
    const { inFight, fightStart, fightEnd } = get();

    return ((inFight ? Date.now() : fightEnd) - fightStart) / 1000;
  },
}));

export default useCombatMonitorStore;
