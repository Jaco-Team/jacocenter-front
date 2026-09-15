import { afterEach, describe, expect, it, vi } from 'vitest';
import { authApi } from './authApi';

const response = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

describe('authApi', () => {
  afterEach(() => vi.restoreAllMocks());

  it('maps login DTOs to the domain session', async () => {
    const fetchMock = vi.fn().mockResolvedValue(response({
      st: true,
      token: 'token-1',
      token_type: 'Bearer',
      expires_at: '2026-09-09T12:00:00+03:00',
      user: { id: '12', login: 'operator', name: 'Оператор' },
    }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(authApi.login('operator', 'secret')).resolves.toEqual({
      token: 'token-1',
      token_type: 'Bearer',
      expires_at: '2026-09-09T12:00:00+03:00',
      user: {
        id: 12,
        login: 'operator',
        name: 'Оператор',
        fullName: 'Оператор',
        shortName: '',
        firstName: null,
        lastName: null,
        middleName: null,
        registeredAt: null,
        birthday: null,
      },
    });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ login: 'operator', password: 'secret' });
  });

  it('maps the current operator response without leaking API DTOs', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response({
      st: true,
      user: { id: 12, login: 'operator', name: null, ignored: 'field' },
    })));

    await expect(authApi.me()).resolves.toEqual({
      user: {
        id: 12,
        login: 'operator',
        name: '',
        fullName: '',
        shortName: '',
        firstName: null,
        lastName: null,
        middleName: null,
        registeredAt: null,
        birthday: null,
      },
    });
  });

  it('updates the editable profile fields and maps the returned operator', async () => {
    const fetchMock = vi.fn().mockResolvedValue(response({
      st: true,
      user: {
        id: 12,
        login: 'operator',
        name: 'Петя',
        full_name: 'Пётр Петров',
        short_name: 'Петя',
        first_name: 'Пётр',
        last_name: 'Петров',
        middle_name: 'Петрович',
        registered_at: '2025-06-04',
        birthday: '2000-01-01',
      },
    }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(authApi.updateProfile({ fullName: 'Пётр Петров', shortName: '' })).resolves.toEqual({
      user: {
        id: 12,
        login: 'operator',
        name: 'Петя',
        fullName: 'Пётр Петров',
        shortName: 'Петя',
        firstName: 'Пётр',
        lastName: 'Петров',
        middleName: 'Петрович',
        registeredAt: '2025-06-04',
        birthday: '2000-01-01',
      },
    });
    expect(fetchMock.mock.calls[0][0]).toContain('/auth/me');
    expect(fetchMock.mock.calls[0][1].method).toBe('PATCH');
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      full_name: 'Пётр Петров',
      short_name: null,
    });
  });

  it('maps refresh sessions and uses the authenticated transport', async () => {
    const fetchMock = vi.fn().mockResolvedValue(response({
      st: true,
      token: 'token-2',
      expires_at: '2026-09-09T13:00:00+03:00',
      user: { id: 12, login: 'operator', name: 'Оператор' },
    }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(authApi.refresh()).resolves.toMatchObject({ token: 'token-2', token_type: 'Bearer' });
    expect(fetchMock.mock.calls[0][0]).toContain('/auth/token/refresh');
    expect(fetchMock.mock.calls[0][1].method).toBe('POST');
  });
});
