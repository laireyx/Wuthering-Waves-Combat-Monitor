import { useCallback } from 'react';

import { ClientLog } from '@common/types/logReader';

import useCombatMonitorStore from '../../../stores/combatMonitor';

export default function usePushLog() {
  const {
    setFightStatus,
    appendBuffLog,
    appendPartLog,
    appendStateMachineLog,
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
          appendPartLog(log);
          return;
        }
        if (log.data.type === 'Skill') {
          return;
        }
        if (log.data.type === 'StateMachineNew') {
          appendStateMachineLog(log);
          return;
        }
      }
    },
    [setFightStatus, appendBuffLog, appendPartLog, appendStateMachineLog],
  );

  return pushLog;
}
