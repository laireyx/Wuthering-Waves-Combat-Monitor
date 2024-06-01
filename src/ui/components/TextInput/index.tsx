import { textInputStyle } from './index.css';

export default function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className={`${textInputStyle} ${className ?? ''}`} />
  );
}
