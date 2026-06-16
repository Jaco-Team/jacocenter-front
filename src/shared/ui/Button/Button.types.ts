import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type TButtonVariant = 'base' | 'icon' | 'text';
export type TButtonType = 'button' | 'submit';
export type TButtonTheme = 'primary' | 'secondary' | 'error';
export type TButtonSize = 'lg' | 'md' | 'sm' | 'icon-md' | 'icon-sm';

export interface IButtonUIProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'onClick'>{
  variant: TButtonVariant;
  theme: TButtonTheme;
  type?: TButtonType;
  size?: TButtonSize;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}