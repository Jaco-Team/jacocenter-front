# Storybook: правила и план развития

## Назначение

Storybook является каталогом UI-компонентов, визуальным контрактом и площадкой для изолированной проверки состояний frontend. Любой переиспользуемый UI должен быть доступен в Storybook без запуска Next.js и без подключения к production API.

Документ является единой точкой хранения правил, ограничений, текущих проблем и задач, связанных со Storybook.

## Текущая конфигурация

- Storybook 10 на `@storybook/nextjs-vite`.
- Истории собираются из `src/**/*.stories.@(js|jsx|mjs|ts|tsx)` и MDX.
- `src/app/globals.css` подключается в `.storybook/preview.ts`.
- Статические файлы берутся из `public`.
- Подключены addons Docs, a11y, Vitest, Chromatic и onboarding.
- Unit/component-интеграция выполняется через `@storybook/addon-vitest`.
- Стилизация использует Tailwind CSS v4, PostCSS и `@apply`.
- UI не использует MUI, Chakra, Ant Design, styled-components или CSS Modules.

Проверки:

```bash
npm run storybook
npm run build-storybook
```

`build-storybook` должен завершаться успешно. Предупреждения сохраняются в разделе известных проблем и не должны скрываться в CI.

## Правила размещения историй

1. История располагается рядом с компонентом: `Component.tsx` и `Component.stories.tsx`.
2. Каждый reusable-компонент из `shared`, `entities`, `features` и `widgets` обязан иметь историю.
3. Типы, API-клиенты, мапперы, store, hooks без UI-рендера отдельной истории не требуют.
4. Page-композиции получают истории только если они являются самостоятельным UI-сценарием; API и авторизация должны быть замокированы.
5. Не импортируйте page-local runtime mocks в production-компоненты. Fixtures для Storybook хранятся рядом с историей или в отдельном Storybook-only каталоге.
6. Имена title следуют FSD-структуре, например `Shared/Button`, `OrderNew/DeliveryTab`, `Widgets/Order/Cart`.
7. Новая история по умолчанию получает `tags: ['autodocs']`, если для компонента не указана обоснованная причина исключения.

## Обязательные состояния

История должна покрывать применимые состояния компонента:

- default/success;
- loading;
- empty;
- validation error;
- API/network error;
- disabled/read-only;
- long text and boundary values;
- keyboard/focus behavior;
- mobile or narrow layout, если компонент адаптивный.

Для интерактивных сценариев используйте `play` и Testing Library assertions. Не ограничивайтесь одной статичной картинкой.

## A11y и визуальные проверки

- Все интерактивные элементы должны иметь доступное имя, корректный `type`, focus state и клавиатурное управление.
- Ошибки и статусы должны быть доступны через семантическую разметку и `role="alert"`, когда это требуется.
- Для ключевых историй добавляйте `play`-сценарии и проверку a11y.
- Глобальный режим a11y сейчас `todo`; для release-критичных историй нарушения должны считаться ошибкой CI.
- Визуальные проверки не должны зависеть от внешнего API, Yandex Maps, текущего времени или случайных данных.

## Стилизация

Текущие `.css` файлы — обычный глобальный CSS, а не CSS Modules. Они импортируются компонентами напрямую и используют Tailwind `@apply`. Поэтому:

- классы должны иметь компонентный префикс или быть очевидно shared;
- нельзя полагаться на порядок случайных импортов;
- новые цвета и размеры берите из токенов `src/app/globals.css`;
- не добавляйте новые произвольные hex-цвета без причины;
- используйте один стиль имени файла для новых компонентов: `<Component>.styles.css`;
- не смешивайте в одной истории runtime API-запросы и визуальную проверку;
- Storybook должен импортировать те же стили, что и runtime-компонент.

Миграция старых `.style.css`/`.styles.css` файлов, глобальных селекторов и дублирующихся токенов выполняется отдельными refactor-шагами и не должна смешиваться с подключением API.

## Текущий охват

В репозитории сейчас около 61 story-файла, 58 CSS-файлов и более 100 TSX-компонентов. Истории есть у большинства shared primitives и части widgets/features, однако покрытие неполное.

Приоритетные пробелы:

- `order-new`: `DeliveryTab`, `PickupTab`, `ByTimeTab`, `NearestTab`, `PaymentBlock`, `OrderCatalogStep` и composition-сценарии;
- delivery map: `Map`, `CafeMarker`, `SearchInput`, `SearchMarker`, `ZoomControls`;
- loading/empty/error states для API-driven UI;
- auth boundaries и состояния восстановления сессии;
- модальные сценарии confirm/delete/success с ошибками и повторной отправкой;
- keyboard, narrow viewport и accessibility сценарии.

## Известные проблемы

- В build Storybook есть предупреждение `unable to find package.json for react-imask`; сборка сейчас завершается успешно, но предупреждение нужно устранить.
- Только малая часть историй использует `play`; интерактивное покрытие недостаточно.
- Явные `parameters.a11y` почти не используются.
- Storybook пока не является CI-gate для полноты историй.
- В проекте есть legacy-истории в `src/stories`, которые нужно постепенно привести к текущей FSD-навигации.
- Полные page stories не должны подменять stories для reusable-компонентов.

## Definition of done для UI-компонента

Компонент считается готовым, когда:

1. У него есть colocated story с autodocs.
2. Все важные состояния доступны через controls или отдельные named stories.
3. Интерактивный happy path покрыт `play`, если у компонента есть действия пользователя.
4. Нет внешних сетевых запросов и случайных значений.
5. Проверены keyboard/focus и a11y для интерактивных элементов.
6. Storybook build и unit/component tests проходят.
7. Стили используют существующие токены и не создают новый глобальный namespace без необходимости.

## План внедрения

1. Добавить stories для всех reusable-компонентов `order-new`, не меняя их UI-контракт.
2. Добавить states stories для API-клиентов: loading, empty, error, access denied, success.
3. Покрыть `play`-сценариями формы, lookup клиента, адресную валидацию, корзину и подтверждение заказа.
4. Добавить a11y checks в CI для release-критичных историй.
5. Устранить `react-imask` warning и документировать стабильный Docker Storybook workflow.
6. Ввести автоматическую проверку отсутствующей colocated story для reusable UI.
7. После стабилизации поведения выполнить отдельный refactor CSS naming/tokens.

## Figma и UI design system

Шаблон Call Center в Figma (`gZUahTk6SRv0Ajz5lponeT`, node `15-2`) принят как
визуальный источник истины для UI kit. Точный разбор node отложен: текущий Figma
MCP-сеанс исчерпал лимит просмотра, поэтому значения из макета нельзя выдумывать
или объявлять подтверждёнными. При следующем доступном просмотре нужно снять
переменные, типографику, размеры, состояния и responsive-варианты, затем сверить
их с реализацией.

Целевая модель токенов:

- foundation: цветовые роли (surface, text, border, action, status, overlay),
  типографика, spacing, размеры control, radii, borders, shadows, z-index и
  breakpoints;
- semantic: роли интерфейса (`surface.page`, `surface.card`, `action.primary`,
  `feedback.error` и т.п.), отделённые от конкретных hex-значений;
- компонентные токены: только отклонения, необходимые конкретному control или
  состоянию; произвольные значения в компонентном CSS запрещены;
- единый источник: CSS custom properties в `globals.css`, экспортированные в
  Tailwind v4 `@theme`; Storybook и Next.js должны подключать один и тот же слой.

Порядок работ после подтверждения Figma:

1. Зафиксировать таблицу Figma tokens и mapping в `globals.css`; удалить дубли и
   дать токенам стабильные имена без привязки к странице.
2. Описать в Storybook foundations: Colors, Typography, Spacing, Elevation,
   Radius, Icons и responsive breakpoints. Для каждой группы нужны usage,
   do/don't и контрастные примеры.
3. Сформировать primitives: Button, IconButton, Input, Select, Checkbox,
   Badge/Status, Tabs, Card, Modal, Table primitives и feedback states. Каждому
   control нужны default, hover, pressed, focus-visible, disabled, loading и
   error-варианты, где применимо.
4. Собрать compound components для order-new и delivery-map через существующие
   FSD-компоненты, не меняя UI orders/kitchen без отдельного согласования.
   Runtime API, auth, часы и карты в stories заменяются deterministic fixtures.
5. Перенести старые `.style.css`/`.styles.css` постепенно: сначала mapping на
   semantic tokens, затем component scope и только потом переименование файлов.
   Миграция не должна менять layout или бизнес-логику.
6. Добавить `autodocs`, named states, `play`-проверки, keyboard/a11y checks и
   narrow viewport stories; для критичных компонентов включить visual regression.
7. Ввести CI-gates: build Storybook, component tests, a11y для release-критичных
   stories и проверку, что новый reusable UI имеет colocated story.

Критерии готовности design system: любой новый цвет/размер проходит через
   token mapping; Storybook показывает foundation и component states без API;
   Next.js и Storybook визуально используют один CSS слой; migration оставляет
   существующие пользовательские сценарии неизменными.

## Запрещено

- Подключать production API, Chef credentials, MariaDB или Redis к Storybook.
- Считать наличие одной статичной story достаточным для сложного workflow.
- Изменять UI orders/kitchen только ради Storybook без отдельного согласования.
- Добавлять визуальные fixtures в runtime-код.
- Скрывать build warnings или объявлять Storybook production-ready без проверки Docker/CI.
