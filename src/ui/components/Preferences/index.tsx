import usePrefStore from '../../stores/pref';
import useUIStore from '../../stores/ui';
import Card from '../Card';
import ModalDialog from '../ModalDialog';
import TextInput from '../TextInput';
import Vertical from '../Vertical';

import { gamePathInputStyle } from './index.css';

export default function Preferences() {
  const { isPrefOpened, closePref } = useUIStore();
  const { gamePath, setGamePath } = usePrefStore();

  return (
    <ModalDialog isOpened={isPrefOpened} onClose={closePref}>
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
    </ModalDialog>
  );
}
