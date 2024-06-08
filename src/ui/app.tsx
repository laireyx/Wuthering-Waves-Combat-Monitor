import Main from './components/Main';
import TitleBar from './components/TitleBar';
import useDefaultGamePath from './hooks/useGameLocation';

export default function App() {
  useDefaultGamePath();

  return (
    <>
      <TitleBar />
      <Main />
    </>
  );
}
