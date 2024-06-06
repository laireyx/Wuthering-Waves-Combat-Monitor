import { indicatorCaptionStyle } from './index.css';

export default function IndicatorCaption({
  children,
}: React.PropsWithChildren) {
  return <span className={indicatorCaptionStyle}>{children}</span>;
}
