import { API_BASE_URL } from '@/shared/config/api';

type HttpConfig = {
  getToken: () => string | null;
  onUnauthorized: () => void;
};

const httpConfig: HttpConfig = {
  getToken: () => null,
  onUnauthorized: () => undefined,
};

export function configureHttp(config: Partial<HttpConfig>) {
  Object.assign(httpConfig, config);
}

export class ApiError extends Error {
  status: number;
  code?: string;
  errors?: Record<string, string[]>;

  constructor(
    status: number,
    message: string,
    code?: string,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  auth?: boolean;
};

type ApiBody = {
  st?: boolean;
  text?: string;
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, auth = true, headers, ...init } = options;
  const token = httpConfig.getToken();
  const requestHeaders = new Headers(headers);

  if (body !== undefined && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (auth && token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = (await parseBody(response)) as ApiBody & T;

  if (response.status === 401 && auth && token) {
    httpConfig.onUnauthorized();
  }

  if (!response.ok || payload?.st === false) {
    throw new ApiError(
      response.status,
      payload?.text || payload?.message || 'Ошибка запроса',
      payload?.code,
      payload?.errors,
    );
  }

  return payload as T;
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}
