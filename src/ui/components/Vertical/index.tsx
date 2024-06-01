import { verticalStyle } from './index.css';

export default function Vertical({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`${verticalStyle} ${className ?? ''}`}>{children}</div>
  );
}
