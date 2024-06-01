import Main from './components/Main';
import TitleBar from './components/TitleBar';
import Vertical from './components/Vertical';

import { appStyle } from './app.css';

export default function App() {
  return (
    <Vertical className={appStyle}>
      <TitleBar />
      <Main />
    </Vertical>
  );
}
