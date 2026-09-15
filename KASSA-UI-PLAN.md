# План сопоставления Kassa UI и развития order-new

Дата аудита: 2026-09-15  
Область: экран оформления заказа (`order-new`), UI kit и Storybook.

## Источники и ограничения аудита

Сравнение выполнено в Chrome по двум доступным поверхностям:

- эталонный Storybook Kassa: `https://kassa.jacochef.ru`, story `Screens / MakeOrders / Основной экран`;
- локальный Storybook: `http://localhost:6006`, stories `HeaderNewOrder` и order-new компонентов.

Эталонный экран был открыт после ручного обхода предупреждения сертификата. Это
не production API и не проверка бизнес-операций. Для визуального сравнения
зафиксирован экран эталона `/tmp/kassa-live-makeorders.png` и локальный снимок
`/tmp/local-headerneworder.png`; файлы являются временными артефактами аудита.

## Что показывает эталон Kassa

Story `MakeOrders / Основной экран` представляет не один контрол, а цельную
операторскую рабочую область:

1. Узкая вертикальная панель навигации с текущим разделом и понятными иконками.
2. Центральная таблица чека: позиция, количество, сумма, уменьшение,
   увеличение и удаление строки.
3. Правая колонка заказа: действие добавления товара, телефон клиента,
   промокод, тип обслуживания (`Зал`, `С собой`), режим времени (`Ближайшее`,
   `Ко времени`) и дальнейшие параметры заказа.
4. Пустой чек вынесен в отдельную story, поэтому отсутствие позиций и заполненный
   чек проверяются независимо.
5. Controls в Storybook позволяют менять начальные позиции, место получения и
   время; Actions/Interactions оставляют след действий оператора.

## Состояние локального callcenter Storybook

Локальный каталог уже содержит сильную основу: shared primitives, foundations,
customer lookup, delivery/pickup, каталог, payment, notifications и модальные
сценарии. Однако order-new пока представлен преимущественно отдельными
widgets/features, а не единым операторским экраном.

Обнаруженные расхождения и точки улучшения:

- нет отдельной композиционной story всего order-new в состояниях `empty cart`,
  заполненный чек, доставка и самовывоз;
- не определён единый contract для controls order-new: город, телефон, клиент,
  точка, позиции, адрес, оплата и ошибки должны задаваться одним fixture;
- телефон и customer lookup, адресная форма, cart и confirmation не собраны в
  один воспроизводимый сценарий;
- важные ошибки (`client not found`, адрес вне зоны, устаревший каталог,
  network error) есть на уровне частей, но не показаны в операторском контексте;
- у ряда stories отсутствуют `play`, keyboard/focus checks и строгий a11y режим;
- map stories могут зависеть от Yandex Maps и должны оставаться deterministic,
  с fake marker/zone state;
- в sidebar Storybook присутствуют исторически раздельные группы `Order` и
  `Orders`; новые stories нельзя добавлять по смешанной схеме регистра;
- текущие CSS-файлы являются глобальным Tailwind/PostCSS CSS, поэтому экранная
  композиция должна использовать существующие tokens, а не вводить локальные
  произвольные цвета, радиусы и отступы;
- live-эталон использует более плотную рабочую раскладку: чек визуально является
  главным объектом, а параметры заказа сгруппированы в правой панели. Локальный
  экран оставляет слишком много свободной площади справа на широком viewport;
- эталон явно показывает действие `Добавить товары`; локальный flow должен иметь
  одинаково ясный возврат из параметров заказа к каталогу;
- destructive action удаления строки и отмены заказа должны иметь одинаковый
  визуальный и клавиатурный контракт;
- для узких экранов нужен отдельный сценарий: панели складываются вертикально,
  но порядок действий оператора сохраняется.

## Принципы реализации

1. Не менять frozen-разделы `Все заказы` и `Заказы на кухне` ради визуального
   сходства. Улучшения сначала делаются в `order-new` и Storybook.
2. Не подключать production API, реальный Redis, Yandex Maps или текущие даты в
   stories. Использовать MSW handlers и детерминированные fixtures.
3. Сначала стабилизировать tokens и публичные props, затем композиционные
   stories, затем play/a11y и только после этого визуальные корректировки.
4. Storybook должен описывать операторские решения и состояния, а не копировать
   внутренние store или API implementation details.
5. Сохранять FSD-направление: `Shared UI` → `Entities` → `Features` → `Widgets` →
   `OrderNew` screen compositions. Не создавать вторые `Order/order` деревья.

## Этапы

### 1. Базовый контракт и tokens

- Инвентаризировать размеры, цвета, радиусы, типографику и состояния,
  используемые эталонным экраном и текущим order-new.
- Сверить их с `src/app/globals.css` и `Shared UI/Foundations`.
- Добавить только недостающие semantic tokens: surface, border, success,
  danger, muted, focus, spacing и panel widths.
- Зафиксировать `OrderNew` layout primitives: shell, navigation rail,
  receipt panel, details panel, section header.
- Не менять бизнес-логику и не добавлять отдельный CSS framework.

### 2. Композиционные stories order-new

- Создать `OrderNew/Screen` или эквивалентную FSD-группу.
- Добавить stories: `Empty`, `CatalogWithItems`, `CustomerFound`,
  `CustomerNotFound`, `DeliveryReady`, `PickupReady`, `InvalidAddress`,
  `StaleCatalog`, `NetworkError`, `Submitting`, `Success`.
- Все stories должны использовать один типизированный fixture и controls для
  города, клиента, позиций, способа получения и оплаты.
- Описать в docs, какая часть состояния принадлежит UI, а какая приходит из API.

### 3. Повторяемые интерактивные сценарии

- `play` для добавления товара, изменения количества, удаления позиции,
  поиска клиента, переключения доставки/самовывоза, проверки адреса,
  подтверждения и закрытия success/error уведомления.
- Проверить защиту от двойного клика при submit и сохранение cart после ошибки.
- Проверить клавиатуру: tab order, Enter/Space для действий, Escape для модалей,
  видимый focus и возврат фокуса после закрытия.
- Использовать Actions только как дополнение к assertions, не как замену проверок.

### 4. UI kit и callcenter-specific каталог

- Сгруппировать stories в `Shared UI`, `Entities`, `Features`, `Widgets`,
  `OrderNew`, `DeliveryMap`, `Orders`, `Kitchen`.
- Для receipt rows, customer summary, address status, payment method,
  notification host и order confirmation определить variants и boundary states.
- Добавить stories для длинного имени блюда, нулевой скидки, большого количества,
  отсутствующего телефона, пустого адреса и disabled submit.
- Убрать или изолировать bootstrap/tutorial stories, не относящиеся к продукту.

### 5. Accessibility и визуальная регрессия

- Перевести release-critical order-new stories с `a11y: todo` на `a11y: error`
  после устранения известных legacy-нарушений.
- Добавить landmark/role assertions для receipt, customer panel, alerts и modal.
- Проверить контраст, размер hit-area, focus ring и отсутствие зависимости от
  цвета без текстового состояния.
- Зафиксировать desktop и narrow viewport snapshots для ключевых stories;
  mobile не должен превращаться в горизонтальный скролл.

### 6. Quality gate и документация

- Расширить `STORYBOOK.md` ссылкой на этот план и правилами screen stories.
- Quality gate: unit/component tests, Storybook build, story interaction tests и
  ручной smoke в Chrome.
- Устранить предупреждение `react-imask` и зафиксировать допустимые внешние
  предупреждения отдельно.
- Не считать Storybook заменой runtime E2E: production API flow проверяется
  отдельно на локальном Docker stack.

## Приоритеты

1. P0: композиционные order-new stories, deterministic fixtures, empty/error/
   success states, Query/MSW providers.
2. P1: receipt/details layout primitives, tokens, keyboard и a11y.
3. P1: notification host, confirmation flow и duplicate-submit states.
4. P2: map-specific stories, visual regression snapshots и cleanup групп.
5. P2: responsive polish после подтверждения desktop layout.

## Definition of done

- Полный order-new screen открывается в Storybook без network/auth/Redis/Yandex
  зависимости.
- Каждое критичное операторское состояние имеет named story и assertions.
- Layout использует semantic tokens и единые primitives, без новых ad-hoc hex,
  размеров или глобальных селекторов.
- Storybook sidebar отражает FSD и не содержит дублирующих регистров.
- `npm test -- --run`, `npm run build-storybook` и выбранные interaction/a11y
  проверки проходят в Docker.
- Реальный runtime order-new не изменён до отдельного review визуального diff.

Этот документ является планом следующего этапа. Реализация начинается только
после завершённого локального E2E и отдельного review плана.
