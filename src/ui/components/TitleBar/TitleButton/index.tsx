import { titleButtonStyle, titleButtonWrapperStyle } from './index.css';

type TitleButtonProps = React.ComponentProps<'span'> & {
  img: string;
  onClick: () => void;
};

export default function TitleButton({
  img,
  className,
  onClick,
  ...props
}: TitleButtonProps) {
  return (
    <span
      className={`${titleButtonWrapperStyle} ${className ?? ''}`}
      {...props}
      onClick={onClick}
    >
      <img className={titleButtonStyle} src={img} />
    </span>
  );
}
