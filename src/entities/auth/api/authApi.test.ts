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
      user: { id: 12, login: 'operator', name: 'Оператор' },
    });
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ login: 'operator', password: 'secret' });
  });

  it('maps the current operator response without leaking API DTOs', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response({
      st: true,
      user: { id: 12, login: 'operator', name: null, ignored: 'field' },
    })));

    await expect(authApi.me()).resolves.toEqual({
      user: { id: 12, login: 'operator', name: '' },
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
