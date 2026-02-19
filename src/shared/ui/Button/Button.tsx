import clsx from 'clsx';
import { IButtonUIProps } from './Button.types';
import './button.style.css';

export const Button: React.FC<IButtonUIProps> = ({
  variant,
  theme,
  size,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        variant,
        theme,
        size,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}