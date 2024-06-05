import { textInputStyle } from './index.css';

export default function TextInput({
  className,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <input {...props} className={`${textInputStyle} ${className ?? ''}`} />
  );
}
