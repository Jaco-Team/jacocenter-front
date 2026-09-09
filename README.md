# Frontend колл-центра JACO

Next.js-приложение рабочего места оператора колл-центра. Frontend переводится с демонстрационных mock-данных на версионированный Call Center API из `../api-callcenter`.

## Локальная разработка

### Запуск на хосте

```bash
cp .env.example .env.local
npm ci
npm run dev
```

По умолчанию API доступен по адресу `http://localhost:8083/api/v1`. Если API опубликован на другом host/port, укажите `NEXT_PUBLIC_API_BASE_URL` в `.env.local`.

### Разработка в Docker

```bash
cp .env.example .env.local
docker compose -f docker-compose.dev.yml up --build
```

Dev-контейнер публикует приложение на `http://localhost:3000`, монтирует исходники для hot reload и хранит `node_modules` и `.next` в именованных volumes. Браузер обращается к API через host URL, поэтому `localhost:8083` корректен, когда API опубликован своим Compose-стеком.

Остановка:

```bash
docker compose -f docker-compose.dev.yml down
```

### Production-образ

```bash
docker compose build
docker compose up -d
```

`Dockerfile` собирает standalone-образ Next. Публичные переменные Next подставляются во время сборки:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8083/api/v1 docker compose build
```

Не помещайте API- или database-credentials во frontend-переменные. Здесь допустимы только публичный URL API и необязательный публичный ключ Yandex Maps.

## API и CORS

API должен разрешать origin браузера. В ignored `.env` репозитория API для локальной разработки укажите:

```dotenv
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

После изменения переменной пересоздайте API-контейнер. Авторизация использует Bearer token из `POST /api/v1/auth/token/login`; frontend хранит сессию в session storage браузера и обновляет токен до истечения срока.

## Архитектура

Целевая структура следует Feature-Sliced Design:

- `app` — маршруты и композиция страниц;
- `widgets` — составные блоки экранов;
- `features` — пользовательские действия и workflow;
- `entities` — доменные модели, API-клиенты и состояние;
- `shared` — transport, configuration, UI-примитивы и утилиты.

Все feature-пути используют lowercase. Доменные API-клиенты находятся внутри entity и не импортируют mock-данные из page-local каталогов. Mock-данные допустимы для Storybook и изолированной визуальной разработки, но не для runtime-экранов после подключения соответствующего API-среза.

## Проверка

```bash
npm run build
npm run test
```

Docker-вариант:

```bash
docker compose -f docker-compose.dev.yml run --rm frontend npm run build
docker compose -f docker-compose.dev.yml run --rm frontend npm run test
```

## Текущий статус интеграции

Transport авторизации и управление сессией реализованы. Остальная миграция mock → API описана в [PLAN.md](./PLAN.md). Пока эти этапы не завершены, несколько экранов намеренно используют локальные mock-данные и не являются end-to-end API-клиентами.
