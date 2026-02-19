'use client';
import Link from 'next/link';
import type { NavLinkProps } from './NavLink.types';
import { usePathname } from 'next/navigation';

export function NavLink({
  href,
  icon,
  children,
  size = 'lg',
  className = '',
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href;
  const isActiveStyles = isActive ? 'ring-[#61A444]' : 'ring-transparent';
  const sizeStyles = size === 'lg' ? 'w-30 h-30' : 'w-15 h-15';
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-2 py-5 px-3 rounded-xl text-[#5E5E5E] ring hover:ring-[#C9C9C9] active:ring-2 active:ring-[#61A444] focus-visible:outline-[#C9C9C9] focus-visible:outline focus-visible:outline-offset-2 transition-all ${sizeStyles} ${className} ${isActiveStyles}`}
    >
      <div className={isActive ? 'text-[#61A444]' : ''}>{icon}</div>

      {size === 'lg' && children && (
        <span className="leading-5 text-center text-[#5E5E5E] line-clamp-2">
          {children}
        </span>
      )}
    </Link>
  );
}

/**
 * TODO: Temp colors (no vars)
 * Olive - #61A444
 * Grey - #C9C9C9
 * Nearly Black - #5E5E5E
 */

export const DummyIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_342_12644)">
      <path
        d="M17.1428 20.5715L10.2856 21.8058L11.4285 14.8572L24.5256 1.80575C24.7381 1.59151 24.9909 1.42147 25.2695 1.30543C25.548 1.18938 25.8468 1.12964 26.1485 1.12964C26.4502 1.12964 26.749 1.18938 27.0275 1.30543C27.3061 1.42147 27.5589 1.59151 27.7714 1.80575L30.1942 4.22861C30.4085 4.44109 30.5785 4.6939 30.6945 4.97243C30.8106 5.25097 30.8703 5.54972 30.8703 5.85146C30.8703 6.1532 30.8106 6.45196 30.6945 6.7305C30.5785 7.00903 30.4085 7.26183 30.1942 7.47432L17.1428 20.5715Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.4285 21.7143V28.5714C27.4285 29.1776 27.1877 29.759 26.7591 30.1877C26.3304 30.6163 25.749 30.8571 25.1428 30.8571H3.42854C2.82233 30.8571 2.24095 30.6163 1.81229 30.1877C1.38364 29.759 1.14282 29.1776 1.14282 28.5714V6.85713C1.14282 6.25092 1.38364 5.66954 1.81229 5.24088C2.24095 4.81223 2.82233 4.57141 3.42854 4.57141H10.2857"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_342_12644">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
