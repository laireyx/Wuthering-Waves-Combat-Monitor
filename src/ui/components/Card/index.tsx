import { cardStyle } from './index.css';

export default function Card({ children }: React.PropsWithChildren) {
  return <div className={cardStyle}>{children}</div>;
}
