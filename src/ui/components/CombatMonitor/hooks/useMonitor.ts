import { useState, useEffect } from 'react';

import usePushLog from './usePushLog';
import usePrefStore from '../../../stores/pref';
import useUIStore from '../../../stores/ui';

export default function useMonitor() {
  const { gamePath } = usePrefStore();
  const { isPrefOpened, setWarning } = useUIStore();
  const [readFailed, setReadFailed] = useState(false);
  const [lastReadPos, setLastReadPos] = useState(0);

  const pushLog = usePushLog();

  useEffect(() => {
    const intervalHandle = setInterval(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async () => {
        if (isPrefOpened) return;
        if (!gamePath) return;
        if (readFailed) return;

        try {
          const { data, position } = await logReader.read({
            filename: `${gamePath}\\Wuthering Waves Game\\Client\\Saved\\Logs\\Client.log`,
            position: lastReadPos,
          });

          data.forEach(pushLog);
          setLastReadPos(position);
          setReadFailed(false);
        } catch (err) {
          console.error(err);
          setReadFailed(true);
        }
      },
      500,
    );

    return () => clearInterval(intervalHandle);
  }, [gamePath, isPrefOpened, lastReadPos, pushLog, readFailed]);

  useEffect(() => {
    if (readFailed) {
      setWarning('Could not read game file.\nCheck game directory again.');
    }
  }, [readFailed, setWarning]);

  useEffect(() => {
    setReadFailed(false);
  }, [gamePath]);
}
