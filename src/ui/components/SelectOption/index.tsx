import { optionStyle } from './index.css';

interface SelectOptionProps extends React.ComponentProps<'option'> {
  label?: string;
}

export default function SelectOption({
  label,
  className,
  ...props
}: SelectOptionProps) {
  return (
    <option {...props} className={`${optionStyle} ${className ?? ''}`}>
      {label}
    </option>
  );
}
