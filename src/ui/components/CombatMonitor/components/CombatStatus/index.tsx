import useCombatMonitorStore from 'src/ui/stores/combatMonitor';

export default function CombatStatus() {
  const { inFight, fightStart, fightEnd } = useCombatMonitorStore();

  return (
    <div>
      Current Status: {inFight ? 'In Fight' : 'Idle'}
      <br />
      {fightStart > 0 && fightEnd > 0 && (
        <>
          {new Date(fightStart).toLocaleTimeString('ko-KR', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
          -
          {new Date(fightEnd).toLocaleTimeString('ko-KR', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </>
      )}
    </div>
  );
}
