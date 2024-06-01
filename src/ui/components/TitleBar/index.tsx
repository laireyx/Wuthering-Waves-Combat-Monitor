import Title from './Title';
import TitleButton from './TitleButton';

import { titlebarStyle } from './index.css';

export default function TitleBar() {
  return (
    <div className={titlebarStyle}>
      <Title />
      <TitleButton />
    </div>
  );
}
