import { LinkProps } from 'next/link';

export type NavLinkSize = 'sm' | 'lg';

export interface NavLinkProps extends LinkProps {
  icon: React.ReactNode;
  size?: NavLinkSize;
  className?: string;
  children?: React.ReactNode;
}
