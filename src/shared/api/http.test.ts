import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, ApiTransportError, apiRequest, configureHttp, createApiClient } from './http';
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

  it('normalizes base URLs and adds an explicit JSON accept header', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ st: true }), { status: 200 }));
    const client = createApiClient({ baseUrl: 'https://api.example.test///', fetch: fetchMock });

    await client.request('/health');

    expect(fetchMock.mock.calls[0][0]).toBe('https://api.example.test/health');
    expect((fetchMock.mock.calls[0][1].headers as Headers).get('Accept')).toBe('application/json');
  });

  it('classifies a timed-out request as a transport error', async () => {
    const fetchMock = vi.fn((_url: string, init: RequestInit) => new Promise<Response>((_, reject) => {
      init.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')), { once: true });
    }));
    const client = createApiClient({ baseUrl: API_BASE_URL, fetch: fetchMock, timeoutMs: 1 });

    await expect(client.request('/slow')).rejects.toMatchObject<ApiTransportError>({ name: 'ApiTransportError', kind: 'timeout' });
  });

  it('supports caller cancellation without treating it as a network failure', async () => {
    const fetchMock = vi.fn((_url: string, init: RequestInit) => new Promise<Response>((_, reject) => {
      init.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')), { once: true });
    }));
    const client = createApiClient({ baseUrl: API_BASE_URL, fetch: fetchMock, timeoutMs: 1000 });
    const controller = new AbortController();
    const pending = client.request('/cancelled', { signal: controller.signal });
    controller.abort();

    await expect(pending).rejects.toMatchObject<ApiTransportError>({ kind: 'aborted' });
  });
});
