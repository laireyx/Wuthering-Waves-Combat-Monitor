import { titleButtonStyle } from '../index.css';

export default function TitleButton() {
  return (
    <span className={titleButtonStyle} onClick={() => window.close()}></span>
  );
}
