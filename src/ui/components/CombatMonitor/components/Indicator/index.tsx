import { indicatorStyle } from './index.css';

type IndicatorProps = React.PropsWithChildren<React.ComponentProps<'span'>>;

export default function Indicator({
  children,
  className,
  ...props
}: IndicatorProps) {
  return (
    <span {...props} className={`${indicatorStyle} ${className ?? ''}`}>
      {children}
    </span>
  );
}
