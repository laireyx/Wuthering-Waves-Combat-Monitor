import { Suspense } from 'react';

import Main from './components/Main';
import Preferences from './components/Preferences';
import TitleBar from './components/TitleBar';
import WarningDialog from './components/WarningDialog';
import useDefaultGamePath from './hooks/useGameLocation';

export default function App() {
  useDefaultGamePath();

  return (
    <Suspense fallback={<>Loading...</>}>
      <TitleBar />
      <Main />
      <Preferences />
      <WarningDialog />
    </Suspense>
  );
}
