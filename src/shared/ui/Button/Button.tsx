import clsx from 'clsx';
import { IButtonUIProps } from './Button.types';
import './button.style.css';

export const Button: React.FC<IButtonUIProps> = ({
  variant,
  theme,
  size,
  children,
  type = 'button',
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(variant, theme, size, className)}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}