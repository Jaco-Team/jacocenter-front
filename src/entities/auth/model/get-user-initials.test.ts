import { describe, expect, it } from 'vitest';
import { getUserInitials } from './get-user-initials';

describe('getUserInitials', () => {
  it('prefers the short name and returns at most two letters', () => {
    expect(getUserInitials({
      id: 1,
      login: 'operator',
      name: 'Иван Иванов',
      fullName: 'Иван Иванов',
      shortName: 'пётр',
    })).toBe('ПЁ');
  });

  it('falls back to the full name, login and placeholder', () => {
    expect(getUserInitials({
      id: 1,
      login: 'operator',
      name: '',
      fullName: 'Иван Иванов',
      shortName: '',
    })).toBe('ИИ');
    expect(getUserInitials({
      id: 1,
      login: 'op',
      name: '',
      fullName: '',
      shortName: '',
    })).toBe('OP');
    expect(getUserInitials(null)).toBe('?');
  });
});
