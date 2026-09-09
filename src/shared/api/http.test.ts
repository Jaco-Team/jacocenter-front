import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, apiRequest, configureHttp } from './http';
import { API_BASE_URL } from '../config/api';

describe('apiRequest', () => {
  const onUnauthorized = vi.fn();

  beforeEach(() => {
    configureHttp({
      getToken: () => 'test-token',
      onUnauthorized,
    });
    onUnauthorized.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends JSON and the current bearer token', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ st: true, data: { id: 7 } }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const result = await apiRequest<{ st: true; data: { id: number } }>('/orders', {
      method: 'POST',
      body: { point_id: 7 },
    });

    expect(result.data.id).toBe(7);
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE_URL}/orders`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ point_id: 7 }),
        headers: expect.any(Headers),
      }),
    );
    const headers = fetchMock.mock.calls[0][1].headers as Headers;
    expect(headers.get('Authorization')).toBe('Bearer test-token');
    expect(headers.get('Content-Type')).toBe('application/json');
  });

  it('normalizes API error envelopes into ApiError', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            st: false,
            text: 'Некорректные данные',
            code: 'VALIDATION_ERROR',
            errors: { phone: ['Неверный номер'] },
          }),
          { status: 422 },
        ),
      ),
    );

    await expect(apiRequest('/customers/lookup')).rejects.toMatchObject({
      name: 'ApiError',
      status: 422,
      message: 'Некорректные данные',
      code: 'VALIDATION_ERROR',
      errors: { phone: ['Неверный номер'] },
    });
  });

  it('clears authorization through the configured callback on 401', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ st: false, text: 'Истек токен' }), { status: 401 })),
    );

    await expect(apiRequest('/auth/me')).rejects.toBeInstanceOf(ApiError);
    expect(onUnauthorized).toHaveBeenCalledOnce();
  });
});
