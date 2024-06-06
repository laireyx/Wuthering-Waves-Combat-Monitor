import { cardStyle } from './index.css';

export default function Card({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.ComponentProps<'div'>>) {
  return (
    <div {...props} className={`${cardStyle} ${className ?? ''}`}>
      {children}
    </div>
  );
}
