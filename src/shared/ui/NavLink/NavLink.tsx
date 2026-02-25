'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavLinkProps } from './NavLink.types';

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
      <div className={`text-[32px] ${isActive ? 'text-[#61A444]' : ''} `}>
        {icon}
      </div>

      {size === 'lg' && children && (
        <span className="leading-5 text-center text-[#5E5E5E] line-clamp-2">
          {children}
        </span>
      )}
    </Link>
  );
}
