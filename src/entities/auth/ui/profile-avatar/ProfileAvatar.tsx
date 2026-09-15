import clsx from 'clsx';
import type { AuthUser } from '../../model/types';
import { getUserInitials } from '../../model/get-user-initials';
import './ProfileAvatar.styles.css';

type ProfileAvatarProps = {
  user: AuthUser | null;
  className?: string;
  size?: 'sm' | 'lg';
};

export function ProfileAvatar({ user, className, size = 'lg' }: ProfileAvatarProps) {
  return (
    <span className={clsx('profile-avatar', `profile-avatar--${size}`, className)} aria-hidden="true">
      {getUserInitials(user)}
    </span>
  );
}
