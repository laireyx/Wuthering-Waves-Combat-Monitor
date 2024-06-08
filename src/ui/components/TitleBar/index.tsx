import Title from './Title';
import TitleButton from './TitleButton';
import useUIStore from '../../stores/ui';

import {
  configButtonStyle,
  shutdownButtonStyle,
  titlebarStyle,
} from './index.css';
import configIcon from '../../assets/config.svg';
import shutdownIcon from '../../assets/shutdown.svg';

export default function TitleBar() {
  const { togglePrefOpened: toggleConfigOpened } = useUIStore();

  return (
    <div className={titlebarStyle}>
      <Title />
      <TitleButton
        className={configButtonStyle}
        img={configIcon}
        onClick={toggleConfigOpened}
      />
      <TitleButton
        className={shutdownButtonStyle}
        img={shutdownIcon}
        onClick={() => window.close()}
      />
    </div>
  );
}
