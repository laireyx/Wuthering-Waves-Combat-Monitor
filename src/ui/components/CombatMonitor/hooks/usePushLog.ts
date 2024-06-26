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
    appendPlayInterfaceLog,
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
      } else if (log.type === 'CombatInfo') {
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
      } else if (log.type === 'UiCore') {
        if (log.data.type === 'PlayInterfaceAnimation') {
          appendPlayInterfaceLog(log);
        }
      }
    },
    [
      setFightStatus,
      appendBuffLog,
      appendSkillLog,
      appendStateMachineLog,
      appendHitLog,
      appendPlayInterfaceLog,
    ],
  );

  return pushLog;
}
