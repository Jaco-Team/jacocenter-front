# План архитектурного улучшения frontend

## Оценка

Текущая архитектура имеет правильную основу, но ещё не полностью соответствует production-grade уровню. API-клиенты разделены по доменам, DTO маппятся на границе, общий transport централизован, а сессия вынесена из UI.

## Приоритетные улучшения

### 1. Инъектируемый transport-клиент

Вместо изменяемой глобальной конфигурации `shared/api/http.ts` нужен фабричный клиент:

```text
createApiClient({
  baseUrl,
  getToken,
  onUnauthorized,
  fetch,
  timeout,
})
```

В runtime используется один browser singleton, а тесты и будущий server-side код получают собственный экземпляр. Доменные клиенты (`customerApi`, `deliveryApi` и остальные) сохраняются; единый «мега-сервис» создавать не нужно.

### 2. Надёжность запросов

Transport должен централизованно обеспечивать:

- timeout и `AbortSignal`;
- нормализацию URL и trailing slash;
- `Accept: application/json`;
- разделение network, timeout, malformed-response и API errors;
- отмену устаревших запросов;
- при необходимости correlation/request ID.

### 3. Координированный refresh

Несколько одновременных `401` должны использовать один общий refresh promise. Исходный запрос повторяется не более одного раза; login и refresh повторно не запускаются. При неудаче refresh сессия очищается.

### 4. Адрес API в production

`NEXT_PUBLIC_API_BASE_URL` встраивается во frontend во время `next build`. Изменение переменной только при запуске контейнера уже собранного образа URL в browser bundle не меняет.

Это корректно, если для каждого окружения собирается свой образ. Для одного образа на несколько окружений нужен same-origin reverse proxy/BFF либо runtime public config. Browser URL нельзя безусловно использовать из Server Components или server actions.

### 5. Server state

Повторяющиеся `useEffect`/`useState` запросы следует постепенно заменить TanStack Query или SWR для cache, deduplication, invalidation, retry и stale/loading-состояний. Zustand оставить для session и локального workflow state, а не для удалённых данных.

### 6. Контракты и безопасность

- Синхронизировать TypeScript DTO с OpenAPI или runtime-схемами.
- `sessionStorage` с Bearer token считать временным компромиссом; для усиленного production-контура предпочтительнее HttpOnly Secure cookie через BFF.
- Добавить transport-тесты для timeout, abort, malformed JSON, 204, URL composition и concurrent refresh.

## Текущий статус и порядок

1. Инъектируемый transport-клиент без изменения импортов доменных API — реализовано.
2. Timeout, URL normalization, типизированные transport errors и тесты — реализовано.
3. Координированный refresh/retry — реализовано.
4. TanStack Query добавлен как optional слой: legacy-код может продолжать работать через прежние clients/stores; новый order-creation catalog уже использует query hooks.
5. Решение по build-time или runtime API configuration.
6. Отдельное решение по HttpOnly-cookie auth.

Документ не расширяет frozen scope заказов, кухни и создания заказа.
