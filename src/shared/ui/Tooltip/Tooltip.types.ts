import { ReactNode } from 'react';

export type TooltipTrigger = 'hover' | 'click';
export type TootlipPlacement = 'top' | 'bottom' | 'right' | 'left';

export interface ITooltipUIProps {
  content: ReactNode;
  children: ReactNode;
  trigger?: TooltipTrigger;
  placement?: TootlipPlacement;
  className?: string;
}