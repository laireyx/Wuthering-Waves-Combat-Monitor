import { useCallback } from 'react';

import { ClientLog } from '@common/types/logReader';

import useCombatMonitorStore from 'src/ui/stores/combatMonitor';
import parseTimestamp from 'src/ui/utils/parseTimestamp';

export default function usePushLog() {
  const { setFightStatus, appendPartLog } = useCombatMonitorStore();

  const pushLog = useCallback(
    (log: ClientLog) => {
      if (log.type === 'Battle') {
        if (log.data.type === 'NotifyInFight') {
          setFightStatus({
            inFight: log.data.inFight,
            timestamp: parseTimestamp(log.timestamp),
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
    [setFightStatus, appendPartLog],
  );

  return pushLog;
}
