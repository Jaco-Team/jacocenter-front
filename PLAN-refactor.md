# План рефакторинга frontend колл-центра

## Назначение

Этот план начинается после стабилизации API-интеграции и не заменяет
`PLAN.md`: текущий план миграции остаётся источником статуса API и runtime.
Рефакторинг выполняется законченными срезами, без изменения поведения экранов
`orders` и `kitchen`, которыми занимается другой разработчик.

## Подтверждённое состояние на 2026-09-15

- Storybook работает на `@storybook/nextjs-vite` и получает общий
  `QueryProvider` через preview decorator.
- В каталоге 69 story-файлов; foundations, shared UI и основные order-new
  сценарии представлены.
- API-driven stories используют MSW и не требуют локального API, базы данных,
  Redis или ключей карт.
- В order-new есть typed API clients, server validation, customer lookup/create,
  адресный flow и единый bottom notification host.
- `PLAN.md` ещё не закрыт: остаются runtime E2E, покрытие ошибок, API
  contract gaps и рефакторинг границ DTO/UI. Переименование старого плана в
  `to-delete-*` пока преждевременно.

## Порядок работ

### 1. Контроль Storybook-каталога

- довести все stories до единого FSD title и `autodocs` metadata;
- добавить истории для map primitives, notification host, order preview и
  reusable order controls;
- для критичных order-new stories добавить `play`-сценарии success/error,
  retry, keyboard и duplicate-submit;
- оставить глобальный a11y режим `todo` до устранения legacy-нарушений, но
  выставить `error` на release-critical stories и запускать их в CI.

### 2. Границы состояния и зависимостей

- выделить единые view-модели и mapper-границы в `entities`;
- не импортировать API DTO в widgets и не переносить query/store логику в
  shared primitives;
- стандартизировать Storybook decorators для QueryClient, router и deterministic
  fixtures;
- убрать page-local mock imports из runtime без затрагивания frozen screens.

### 3. Надёжность order-new

- зафиксировать state machine draft → validate → confirm → success/error;
- обеспечить отмену устаревших запросов и защиту от повторной отправки;
- проверить customer lookup/create, address handoff, pickup/delivery и server
  totals через component stories и Docker integration tests;
- отображать только server-provided order number, prices, slots и payment state.

### 4. Производственный quality gate

- Docker: unit tests, Storybook build, Next build и smoke против local API;
- case-sensitive import audit и проверка отсутствия duplicate-case paths;
- bounded Chrome E2E: login, lookup/create customer, catalog, address, order
  confirm и появление заказа в списках;
- не включать credentials Chef/MariaDB/Redis во frontend bundle;
- устранить предупреждение `react-imask` и зафиксировать версии Storybook
  addons перед включением CI-gate.

## Definition of done

Рефакторинг завершён, когда каждый reusable UI имеет colocated autodocs story,
критичный интерактивный путь имеет portable `play`-проверку, API-зависимые
состояния воспроизводятся через MSW, Docker quality gate проходит, а изменения
не нарушают frozen `orders`/`kitchen` scope.

## Явно отложено

- полноценное visual regression сравнение с Figma;
- перенос operator status transitions в новый API без подтверждённого
  backend-контракта;
- изменение схемы базы данных;
- крупный redesign существующих orders/kitchen экранов.
