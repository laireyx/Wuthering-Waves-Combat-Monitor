import { useCallback } from 'react';

import { ClientLog } from '@common/types/logReader';

import useCombatMonitorStore from 'src/ui/stores/combatMonitor';

export default function usePushLog() {
  const { setFightStatus, appendBuffLog, appendPartLog } =
    useCombatMonitorStore();

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
      }
    },
    [setFightStatus, appendBuffLog, appendPartLog],
  );

  return pushLog;
}
