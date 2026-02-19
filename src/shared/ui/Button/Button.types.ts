import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type TButtonVariant = 'base' | 'icon';
export type TButtonTheme = 'primary' | 'secondary' | 'error';
export type TButtonSize = 'lg' | 'md' | 'sm' | 'icon-md' | 'icon-sm';

export interface IButtonUIProps
  extends ComponentPropsWithoutRef<'button'> {
  variant: TButtonVariant;
  theme: TButtonTheme;
  size?: TButtonSize;
  children: ReactNode;
}