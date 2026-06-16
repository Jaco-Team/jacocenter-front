import { LinkProps } from 'next/link';

export type NavLinkSize = 'sm' | 'lg';

// TODO: удалить заметки. Это комментарии для отображения в Storybook доках.
export interface NavLinkProps extends LinkProps {
  /** Какая иконка у кнопки? */
  icon: React.ReactNode;
  /** Какой размер у кнопки? */
  size?: NavLinkSize;
  /** Какие стили применить? */
  className?: string;
  /** Какой текст у кнопки? */
  children?: React.ReactNode;
}
