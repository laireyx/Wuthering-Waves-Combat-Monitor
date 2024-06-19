import { useCallback } from 'react';

import { ClientLog } from '@common/types/logReader';

import useCombatMonitorStore from '../../../stores/combatMonitor';

export default function usePushLog() {
  const {
    setFightStatus,
    appendBuffLog,
    appendStateMachineLog,
    appendSkillLog,
    appendHitLog,
  } = useCombatMonitorStore();

  const pushLog = useCallback(
    (log: ClientLog) => {
      if (log.type === 'Battle') {
        if (log.data.type === 'NotifyInFight') {
          setFightStatus({
            inFight: log.data.inFight,
            timestamp: log.timestamp,
          });

          return;
        }

        return;
      }

      if (log.type === 'CombatInfo') {
        if (log.data.type === 'Ai') {
          return;
        }
        if (log.data.type === 'Buff') {
          appendBuffLog(log);
          return;
        }

        if (log.data.type === 'Part') {
          return;
        }
        if (log.data.type === 'Skill') {
          appendSkillLog(log);
          return;
        }
        if (log.data.type === 'StateMachineNew') {
          appendStateMachineLog(log);
          return;
        }
        if (log.data.type === 'Hit') {
          appendHitLog(log);
          return;
        }
      }
    },
    [
      setFightStatus,
      appendBuffLog,
      appendSkillLog,
      appendStateMachineLog,
      appendHitLog,
    ],
  );

  return pushLog;
}
