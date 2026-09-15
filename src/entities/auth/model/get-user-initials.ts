import type { AuthUser } from './types';

export function getUserInitials(user: AuthUser | null): string {
  const source = user?.shortName.trim() || user?.fullName.trim() || user?.name.trim() || user?.login.trim() || '';
  const words = source.split(/\s+/).filter(Boolean);

  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toLocaleUpperCase('ru-RU');

  return `${words[0][0]}${words[1][0]}`.toLocaleUpperCase('ru-RU');
}
