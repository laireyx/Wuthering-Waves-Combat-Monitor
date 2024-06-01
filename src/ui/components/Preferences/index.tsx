import usePrefStore from '../../stores/pref';
import Card from '../Card';
import TextInput from '../TextInput';
import Vertical from '../Vertical';

export default function Preferences() {
  const { gameDir, setGameDir } = usePrefStore();

  return (
    <Card>
      <Vertical>
        Game Directory
        <TextInput
          value={gameDir}
          onChange={(e) => setGameDir(e.target.value)}
        />
      </Vertical>
    </Card>
  );
}
