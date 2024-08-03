import { useId } from 'react';

import { selectLabelStyle, selectStyle } from './index.css';

interface SelectProps
  extends Omit<React.PropsWithChildren<React.ComponentProps<'select'>>, 'id'> {
  label?: string;
}

export default function Select({
  label,
  className,
  children,
  ...props
}: SelectProps) {
  const inputId = useId();

  return (
    <>
      {label && (
        <label htmlFor={inputId} className={selectLabelStyle}>
          {label}
        </label>
      )}
      <select
        {...props}
        id={inputId}
        className={`${selectStyle} ${className ?? ''}`}
      >
        {children}
      </select>
    </>
  );
}
