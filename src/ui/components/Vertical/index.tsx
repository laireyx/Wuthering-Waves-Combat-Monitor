import { verticalStyle } from './index.css';

export default function Vertical({ children }: React.PropsWithChildren) {
  return <div className={verticalStyle}>{children}</div>;
}
