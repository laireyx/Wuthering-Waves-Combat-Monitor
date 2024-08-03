import { useEffect } from 'react';

import { Lang } from '@common/resources/loader';

import { changeLanguage } from '../../hooks/useResource';
import usePrefStore from '../../stores/pref';
import useUIStore from '../../stores/ui';
import Card from '../Card';
import ModalDialog from '../ModalDialog';
import Select from '../Select';
import SelectOption from '../SelectOption';
import TextInput from '../TextInput';
import Vertical from '../Vertical';

import { gamePathInputStyle } from './index.css';

export default function Preferences() {
  const { isPrefOpened, closePref } = useUIStore();
  const { gamePath, lang, setGamePath, setLang } = usePrefStore();

  useEffect(() => {
    if (lang) changeLanguage(lang);
  }, [lang]);

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
          <Select
            className={gamePathInputStyle}
            label="Language"
            value={lang ?? 'en'}
            onChange={(e) => setLang(e.target.value as Lang)}
          >
            <SelectOption label="English" value="en" />
            <SelectOption label="한국어" value="ko" />
          </Select>
        </Vertical>
      </Card>
    </ModalDialog>
  );
}
