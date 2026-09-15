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

Команда запускает два dev-сервиса:

- приложение: `http://localhost:3000`;
- Storybook UI kit: `http://localhost:6006`.

Оба сервиса используют один исходный каталог и общий именованный volume
`node_modules`; изменения исходников доступны через hot reload. Storybook
запускается отдельным процессом командой `npm run storybook -- --host 0.0.0.0`
и не требует API для isolated stories. Браузер обращается к API через host URL,
поэтому `localhost:8083` корректен, когда API опубликован своим Compose-стеком.
Контейнер имеет healthcheck по HTTP; состояние можно проверить командой
`docker compose -f docker-compose.dev.yml ps`.
Если порт `3000` занят host-разработкой, запускайте проверочный контейнер с
`FRONTEND_PORT=3001`; публичный API URL при этом остаётся browser-доступным
host URL.
Порт Storybook можно изменить независимо: `STORYBOOK_PORT=6007`.

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

Production-контейнер также имеет healthcheck. После запуска дождитесь статуса
`healthy` перед браузерной проверкой или подключением reverse proxy.

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
npm run check:ui
```

Docker-вариант:

```bash
docker compose -f docker-compose.dev.yml run --rm frontend npm run build
docker compose -f docker-compose.dev.yml run --rm frontend npm run test
```

`check:ui` — единый UI quality gate: он запускает component/unit tests и
production Storybook build. Его следует выполнять перед изменениями shared,
feature и widget UI; Storybook stories не должны обращаться к реальному API.

## Текущий статус интеграции

Transport авторизации и управление сессией реализованы: DTO маппятся на границе
API, истёкшие сессии очищаются, а refresh/logout имеют recovery-поведение.
`order-new` подключён к catalog, customer lookup и явному добавлению клиента через
`CustomerCreateModal`, address validation,
cart validation, draft/confirm, map coordinates и notification toast.
Страницы `orders` и `kitchen` уже используют typed `/orders` и
`/kitchen/orders` clients. Их UI/refactor boundary остаётся frozen из-за
параллельной работы владельца, но это не означает runtime mock-данные.
Детальная граница и следующий порядок работы описаны в [PLAN.md](./PLAN.md).

Личный кабинет оператора доступен на `/lk`: профиль загружается через `GET /auth/me`, а полное и короткое имя сохраняются через `PATCH /auth/me`. Показатели за выбранный период загружаются через `GET /auth/me/metrics` и суммируются по всем доступным сотруднику точкам. Для записи в Chef API должен запускаться с явно разрешённым `MAIN_DB_ALLOW_WRITES=true`.

Вкладка `/clients` использует `GET /customers/lookup`, `GET /customers/{id}/orders`, `GET /orders/{id}?point_id=...` и `GET /promos`. Для запросов требуется авторизованная сессия оператора; отдельного API для повторения заказа сейчас нет.

## Dev mode: shortcuts, fixtures и ограничения

Локальный режим предназначен для разработки и проверки интерфейса на копии Chef
данных. Он не является режимом обхода авторизации или бизнес-проверок.

### API и база данных

- `CALLCENTER_DEV_IGNORE_CLOSE_BUY=true` временно игнорирует устаревший
  `close_buy` в локальной Chef-копии. Флаг действует только при `APP_ENV=local`;
  staging и production принудительно используют обычную проверку доступности.
- `MAIN_DB_ALLOW_WRITES=true` разрешает записи в Chef (`customers`, адреса,
  профиль оператора и служебные password metadata). По умолчанию `false`.
  Системная база `laravel_callcenter` при этом всё равно используется для
  токенов, черновиков, outbox и состояния API.
- `AUTO_MIGRATE=true` — локальный Compose по умолчанию применяет guarded
  migrations только к `laravel_callcenter`. Для production/shared DB ставьте
  `AUTO_MIGRATE=false` и применяйте migrations отдельно DBA.
- `CHEF_DB_*`, `SYSTEM_DB_*` и `NEXT_PUBLIC_API_BASE_URL` выбирают реальные
  подключения. Они не подменяются mock-сервисами автоматически; перед тестом
  проверяйте `callcenter:db:identity` и effective API URL.

### Frontend и Storybook

- Storybook использует MSW handlers и типизированные fixtures для городов,
  точек, каталога, доставки, клиентов, корзины и order draft workflow. Stories
  не должны обращаться к production API или базе данных.
- `OrderNew/Screen` содержит изолированные сценарии Empty Cart, Delivery Ready и
  Confirm Success. Они seed-ят Zustand store и мокают draft → validation →
  confirm; эти данные не попадают в runtime-приложение.
- Unit/component tests используют `vi.stubGlobal('fetch')` и spies. Это только
  тестовые замены транспорта.
- `onUnhandledRequest: 'bypass'` оставлен для постепенной миграции stories:
  незамоканный запрос уходит в настроенный API. Это не fallback для production и
  не должно использоваться как способ скрыть ошибку интеграции.
- Если `NEXT_PUBLIC_YMAPS_API_KEY` отсутствует, карта показывает явную ошибку
  конфигурации. Координаты и карта не подменяются фиктивным runtime-виджетом.

### Поведение создания клиента

Если поиск по телефону не находит клиента, order-new открывает форму
`CustomerCreateModal`. Заказ нельзя подтвердить без выбранного или явно
созданного клиента. Автоматическое создание записи с именем `Клиент` удалено,
чтобы не загрязнять Chef placeholder-пользователями.

Старые локальные записи с именем `Клиент` могут оставаться в тестовой базе — это
исторические данные предыдущего поведения, а не новые Storybook fixtures.
