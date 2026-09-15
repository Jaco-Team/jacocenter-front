import { describe, expect, it } from 'vitest';
import { normalizeProfileValues, validateProfileValues } from './profile-form';

describe('profile form model', () => {
  it('trims editable names before sending them to the API', () => {
    expect(normalizeProfileValues({ fullName: '  Иван Иванов  ', shortName: '  Иван  ' })).toEqual({
      fullName: 'Иван Иванов',
      shortName: 'Иван',
    });
  });

  it('requires a full name and allows an empty short name', () => {
    expect(validateProfileValues({ fullName: ' ', shortName: '' })).toEqual({
      fullName: 'Укажите полное имя',
    });
    expect(validateProfileValues({ fullName: 'Иван Иванов', shortName: '' })).toEqual({});
  });
});
