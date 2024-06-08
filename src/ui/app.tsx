import Main from './components/Main';
import Preferences from './components/Preferences';
import TitleBar from './components/TitleBar';
import WarningDialog from './components/WarningDialog';
import useDefaultGamePath from './hooks/useGameLocation';

export default function App() {
  useDefaultGamePath();

  return (
    <>
      <TitleBar />
      <Main />
      <Preferences />
      <WarningDialog />
    </>
  );
}
