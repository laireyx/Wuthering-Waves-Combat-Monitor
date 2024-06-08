import { useId } from 'react';

import { textInputLabelStyle, textInputStyle } from './index.css';

interface TextInputProps extends Omit<React.ComponentProps<'input'>, 'id'> {
  label?: string;
}

export default function TextInput({
  label,
  className,
  ...props
}: TextInputProps) {
  const inputId = useId();

  return (
    <>
      {label && (
        <label htmlFor={inputId} className={textInputLabelStyle}>
          {label}
        </label>
      )}
      <input
        {...props}
        id={inputId}
        className={`${textInputStyle} ${className ?? ''}`}
      />
    </>
  );
}
