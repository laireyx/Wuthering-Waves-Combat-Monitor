import { create } from 'zustand';

import { CombatInfoLog, UiCoreLog } from '@common/types/logReader';
import {
  KnownBuffKeys,
  KnownBuffs,
} from '@common/types/logReader/CombatInfo/buffs';

import parseTimestamp from '../utils/parseTimestamp';

interface Buff {
  activated: boolean;
  activationTime: number;
  accumulatedTime: number;
}

interface CombatMonitorStore {
  status: 'inFight' | 'inFightPaused' | 'idle';

  fightStart: number;
  fightEnd: number;

  pauseStart: number;
  totalPause: number;

  // Should reset these values when fight started.
  fightBuffs: Record<string, Buff>;
  totalDamage: number;
  staggerCount: number;
  qteCount: number;
  hitCount: number;

  setFightStatus: (opts: { inFight: boolean; timestamp: string }) => void;
  appendBuffLog: (log: CombatInfoLog) => void;
  appendStateMachineLog: (log: CombatInfoLog) => void;
  appendSkillLog: (log: CombatInfoLog) => void;
  appendHitLog: (log: CombatInfoLog) => void;

  appendPlayInterfaceLog: (log: UiCoreLog) => void;

  pauseDuration: () => number;
  fightDuration: () => number;
  calcAccBuffTime: (buffKey: keyof KnownBuffs) => number;
}

const useCombatMonitorStore = create<CombatMonitorStore>((set, get) => ({
  status: 'idle',

  fightStart: -1,
  fightEnd: -1,

  pauseStart: -1,
  totalPause: 0,

  fightBuffs: {},
  totalDamage: 0,
  staggerCount: 0,
  qteCount: 0,
  hitCount: 0,

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

  /**
   * Handles only a small number of buffs(cuz it's complex to handle all buffs; their effect varies a lot).
   */
  appendBuffLog: ({ data, timestamp }) => {
    const { status } = get();
    if (status === 'idle') return;
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
    if (status === 'idle') return;

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

  pauseDuration: () => {
    const { status, pauseStart, totalPause } = get();

    return (
      totalPause + (status === 'inFightPaused' ? Date.now() - pauseStart : 0)
    );
  },

  fightDuration: () => {
    const { status, fightStart, fightEnd, pauseDuration } = get();

    return (
      (status !== 'idle' ? Date.now() : fightEnd) - fightStart - pauseDuration()
    );
  },

  calcAccBuffTime: (buffKey) => {
    const { fightBuffs } = get();

    const targetBuff = fightBuffs[buffKey];
    if (!targetBuff) return 0;

    const accumulatedTime = targetBuff.accumulatedTime;
    return (
      accumulatedTime +
      (targetBuff.activated ? Date.now() - targetBuff.activationTime : 0)
    );
  },
}));

export default useCombatMonitorStore;
