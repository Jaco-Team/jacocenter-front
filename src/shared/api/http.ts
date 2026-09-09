import { API_BASE_URL } from '@/shared/config/api';

type HttpConfig = { getToken: () => string | null; onUnauthorized: () => void };
type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown; auth?: boolean; timeoutMs?: number };
type ApiBody = { st?: boolean; text?: string; message?: string; code?: string; errors?: Record<string, string[]> };
type TransportErrorKind = 'network' | 'timeout' | 'aborted';

const DEFAULT_TIMEOUT_MS = 15_000;
const httpConfig: HttpConfig = { getToken: () => null, onUnauthorized: () => undefined };

export function configureHttp(config: Partial<HttpConfig>) { Object.assign(httpConfig, config); }

export class ApiError extends Error {
  status: number;
  code?: string;
  errors?: Record<string, string[]>;

  constructor(status: number, message: string, code?: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

export class ApiTransportError extends Error {
  kind: TransportErrorKind;

  constructor(kind: TransportErrorKind, message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'ApiTransportError';
    this.kind = kind;
  }
}

export type ApiClientOptions = {
  baseUrl: string;
  getToken?: () => string | null;
  onUnauthorized?: () => void;
  fetch?: typeof globalThis.fetch;
  timeoutMs?: number;
};

export function createApiClient(options: ApiClientOptions) {
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const fetcher = options.fetch ?? ((...args: Parameters<typeof globalThis.fetch>) => globalThis.fetch(...args));
  const getToken = options.getToken ?? (() => null);
  const onUnauthorized = options.onUnauthorized ?? (() => undefined);
  const defaultTimeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  return {
    request<T>(path: string, requestOptions: RequestOptions = {}): Promise<T> {
      return request<T>(baseUrl, fetcher, getToken, onUnauthorized, defaultTimeoutMs, path, requestOptions);
    },
  };
}

export const apiClient = createApiClient({
  baseUrl: API_BASE_URL,
  getToken: () => httpConfig.getToken(),
  onUnauthorized: () => httpConfig.onUnauthorized(),
});

export function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  return apiClient.request<T>(path, options);
}

async function request<T>(
  baseUrl: string,
  fetcher: typeof globalThis.fetch,
  getToken: () => string | null,
  onUnauthorized: () => void,
  defaultTimeoutMs: number,
  path: string,
  options: RequestOptions,
): Promise<T> {
  const { body, auth = true, timeoutMs = defaultTimeoutMs, signal: externalSignal, headers, ...init } = options;
  const token = getToken();
  const requestHeaders = new Headers(headers);
  requestHeaders.set('Accept', 'application/json');
  if (body !== undefined && !requestHeaders.has('Content-Type')) requestHeaders.set('Content-Type', 'application/json');
  if (auth && token) requestHeaders.set('Authorization', `Bearer ${token}`);

  const controller = new AbortController();
  let timedOut = false;
  const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, Math.max(timeoutMs, 0));
  const abortFromCaller = () => controller.abort();
  externalSignal?.addEventListener('abort', abortFromCaller, { once: true });

  try {
    const response = await fetcher(joinUrl(baseUrl, path), {
      ...init,
      headers: requestHeaders,
      signal: controller.signal,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const payload = (await parseBody(response)) as ApiBody & T;
    if (response.status === 401 && auth && token) onUnauthorized();
    if (!response.ok || payload?.st === false) {
      throw new ApiError(response.status, payload?.text || payload?.message || 'Ошибка запроса', payload?.code, payload?.errors);
    }
    return payload as T;
  } catch (error) {
    if (error instanceof ApiError || error instanceof ApiTransportError) throw error;
    if (timedOut) throw new ApiTransportError('timeout', 'Превышено время ожидания API-запроса', { cause: error });
    if (externalSignal?.aborted) throw new ApiTransportError('aborted', 'API-запрос отменён', { cause: error });
    throw new ApiTransportError('network', 'API недоступен', { cause: error });
  } finally {
    clearTimeout(timeout);
    externalSignal?.removeEventListener('abort', abortFromCaller);
  }
}

function normalizeBaseUrl(value: string): string { return value.trim().replace(/\/+$/, ''); }
function joinUrl(baseUrl: string, path: string): string { return `${baseUrl}/${path.replace(/^\/+/, '')}`; }

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return {};
  try { return JSON.parse(text); } catch { return { message: text }; }
}
