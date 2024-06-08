import { useCallback, useEffect, useRef } from 'react';

import usePrefStore from '../../stores/pref';
import useUIStore from '../../stores/ui';
import Card from '../Card';
import TextInput from '../TextInput';
import Vertical from '../Vertical';

import { gamePathInputStyle, preferencesStyle } from './index.css';

export default function Preferences() {
  const { isPrefOpened, togglePrefOpened } = useUIStore();
  const { gamePath, setGamePath } = usePrefStore();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeOnBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) togglePrefOpened();
    },
    [togglePrefOpened],
  );

  useEffect(() => {
    if (isPrefOpened) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isPrefOpened]);

  return (
    <dialog
      ref={dialogRef}
      className={preferencesStyle}
      onClick={closeOnBackdrop}
    >
      <Card>
        <Vertical>
          <TextInput
            className={gamePathInputStyle}
            label="Game Directory"
            value={gamePath ?? 'Detecting Wuthering Waves Game Directory...'}
            placeholder="Wuthering Waves Game Directory"
            onChange={(e) => setGamePath(e.target.value)}
          />
        </Vertical>
      </Card>
    </dialog>
  );
}
