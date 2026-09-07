import { Column } from "@/shared/ui/Table/Table.types";
import { Order } from "./TableOrders.types";
import { Text } from "@/shared/ui/Typography/Typography";
import { StatusTag } from "@/widgets/orders/ui/StatusTag/StatusTag";
import { orderStatus } from "@/widgets/orders/utils/constants";
import { OrderTypeIcon } from "@/widgets/orders/ui/OrderTypeIcon/OrderTypeIcon";
import { PreparedCell } from "@/widgets/orders/ui/PreparedCell/PreparedCell";

type SortDir = "asc" | "desc" | null;

export const getOrdersColumns = (
  activeColumn: "status" | "type" | "createdBy" | null,
  sortKey: string | null = null,
  sortDir: SortDir = null,
  onSort?: (key: string) => void,
): Column<Order>[] => [
  {
    key: "orderNumber",
    title: "№",
    width: 80,
    render: (value) => (
      <Text variant="label-s-semibold-12" className="text-text-base">
        {value}
      </Text>
    ),
  },
  {
    key: "type",
    title: "ТИП",
    width: 72,
    isHeaderActive: activeColumn === "type",
    headerRender: (col) => (
      <button
        type="button"
        popoverTarget="type-filters"
        style={{ anchorName: "--type-filters" }}
        className="flex h-full w-full cursor-pointer items-center justify-center gap-2 border-none bg-transparent p-0"
      >
        <Text variant={activeColumn === "type" ? "label-s-semibold-12" : "label-s-regular-12"}>
          {col.title}
        </Text>
        <Arrow active={activeColumn === "type"} />
      </button>
    ),
    render: (value) => <OrderTypeIcon type={value as keyof typeof orderStatus} />,
  },
  {
    key: "status",
    title: "СТАТУС",
    width: 100,
    isHeaderActive: activeColumn === "status",
    headerRender: (col) => (
      <button
        type="button"
        popoverTarget="status-filters"
        style={{ anchorName: "--status-filters" }}
        className="flex h-full w-full cursor-pointer items-center justify-center gap-2 border-none bg-transparent p-0"
      >
        <Text variant={activeColumn === "status" ? "label-s-semibold-12" : "label-s-regular-12"}>
          {col.title}
        </Text>
        <Arrow active={activeColumn === "status"} />
      </button>
    ),
    render: (value) => <StatusTag status={value as keyof typeof orderStatus} />,
  },
  {
    key: "openedAt",
    title: "ОФОРМЛЕН",
    width: 100,
    isHeaderActive: sortKey === "openedAt",
    headerRender: (col) => (
      <button
        type="button"
        onClick={() => onSort?.(col.key)}
        className="flex h-full w-full cursor-pointer items-center justify-center gap-2 border-none bg-transparent p-0"
      >
        <Text variant={sortKey === "openedAt" ? "label-s-semibold-12" : "label-s-regular-12"}>
          {col.title}
        </Text>
        <SortArrow active={sortKey === "openedAt"} dir={sortKey === "openedAt" ? sortDir : null} />
      </button>
    ),
  },
  {
    key: "timeToOverdue",
    title: "ПРИГОТОВЛЕН",
    width: 110,
    render: (_value, row) => <PreparedCell order={row} />,
  },
  {
    key: "receivedAt",
    title: "ЗАВЕРШЁН",
    width: 100,
  },
  {
    key: "amount",
    title: "СУММА",
    width: 100,
    render: (value) => (
      <Text variant="label-s-semibold-12" className="text-text-base">
        {Number(value).toLocaleString("ru-RU")} ₽
      </Text>
    ),
  },
  {
    key: "createdBy",
    title: "Оформил",
    width: 100,
    isHeaderActive: activeColumn === "createdBy",
    headerRender: (col) => (
      <button
        type="button"
        popoverTarget="created-by-filters"
        style={{ anchorName: "--created-by-filters" }}
        className="flex h-full w-full cursor-pointer items-center justify-center gap-2 border-none bg-transparent p-0"
      >
        <Text variant={activeColumn === "createdBy" ? "label-s-semibold-12" : "label-s-regular-12"}>
          {col.title}
        </Text>
        <Arrow active={activeColumn === "createdBy"} />
      </button>
    ),
  },
  { key: "phone", title: "Телефон клиента", width: 120 },
  { key: "address", title: "Адрес доставки", width: 120 },
  { key: "dueTime", title: "Ко времени", width: 100 },
  { key: "closedAtKitchen", title: "Закрыли\nна кухне", width: 100 },
  { key: "promisedAt", title: "Обещали", width: 100 },
  { key: "payment", title: "Оплата", width: 100 },
  { key: "driver", title: "Водитель", width: 132 },
];

const Arrow = ({ active }: { active: boolean }) =>
  active ? (
    <div className="mt-1 h-[10px] w-[10px] rotate-45 border-t-[1.5px] border-l-[1.5px] border-primary" />
  ) : (
    <div className="mb-1 h-[10px] w-[10px] -rotate-45 border-b border-l border-text-secondary" />
  );

const SortArrow = ({ active, dir }: { active: boolean; dir: SortDir }) => {
  if (!active || !dir) {
    return <div className="mb-1 h-[10px] w-[10px] -rotate-45 border-b border-l border-text-secondary" />;
  }
  return dir === "asc" ? (
    <div className="mt-1 h-[10px] w-[10px] rotate-45 border-t-[1.5px] border-l-[1.5px] border-primary" />
  ) : (
    <div className="mb-1 h-[10px] w-[10px] -rotate-45 border-b-[1.5px] border-l-[1.5px] border-primary" />
  );
};
