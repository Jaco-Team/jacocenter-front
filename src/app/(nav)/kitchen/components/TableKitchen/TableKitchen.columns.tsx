import { Column } from "@/shared/ui/Table/Table.types";
import { KitchenOrder } from "./TableKitchen.types";
import { Text } from "@/shared/ui/Typography/Typography";
import { StatusTag } from "@/widgets/orders/ui/StatusTag/StatusTag";
import { orderStatus } from "@/widgets/orders/utils/constants";
import { OrderTypeIcon } from "@/widgets/orders/ui/OrderTypeIcon/OrderTypeIcon";
import { PreparedCell } from "@/widgets/orders/ui/PreparedCell/PreparedCell";

type SortDir = "asc" | "desc" | null;

export const getKitchenColumns = (
  activeColumn: "status" | "type" | null,
  sortKey: string | null = null,
  sortDir: SortDir = null,
  onSort?: (key: string) => void,
): Column<KitchenOrder>[] => [
  {
    key: "number",
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
    key: "orderedAt",
    title: "ОФОРМЛЕН",
    width: 100,
    isHeaderActive: sortKey === "orderedAt",
    headerRender: (col) => (
      <button
        type="button"
        onClick={() => onSort?.(col.key)}
        className="flex h-full w-full cursor-pointer items-center justify-center gap-2 border-none bg-transparent p-0"
      >
        <Text variant={sortKey === "orderedAt" ? "label-s-semibold-12" : "label-s-regular-12"}>
          {col.title}
        </Text>
        <SortArrow active={sortKey === "orderedAt"} dir={sortKey === "orderedAt" ? sortDir : null} />
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
    key: "readyAt",
    title: "Выход на стол",
    width: 110,
    isHeaderActive: sortKey === "readyAt",
    headerRender: (col) => (
      <button
        type="button"
        onClick={() => onSort?.(col.key)}
        className="flex h-full w-full cursor-pointer items-center justify-center gap-2 border-none bg-transparent p-0"
      >
        <Text variant={sortKey === "readyAt" ? "label-s-semibold-12" : "label-s-regular-12"}>
          {col.title}
        </Text>
        <SortArrow active={sortKey === "readyAt"} dir={sortKey === "readyAt" ? sortDir : null} />
      </button>
    ),
  },
  {
    key: "assembledAt",
    title: "Собрали",
    width: 100,
    isHeaderActive: sortKey === "assembledAt",
    headerRender: (col) => (
      <button
        type="button"
        onClick={() => onSort?.(col.key)}
        className="flex h-full w-full cursor-pointer items-center justify-center gap-2 border-none bg-transparent p-0"
      >
        <Text variant={sortKey === "assembledAt" ? "label-s-semibold-12" : "label-s-regular-12"}>
          {col.title}
        </Text>
        <SortArrow
          active={sortKey === "assembledAt"}
          dir={sortKey === "assembledAt" ? sortDir : null}
        />
      </button>
    ),
  },
  {
    key: "preparedAt",
    title: "Приготовили",
    width: 110,
    isHeaderActive: sortKey === "preparedAt",
    headerRender: (col) => (
      <button
        type="button"
        onClick={() => onSort?.(col.key)}
        className="flex h-full w-full cursor-pointer items-center justify-center gap-2 border-none bg-transparent p-0"
      >
        <Text variant={sortKey === "preparedAt" ? "label-s-semibold-12" : "label-s-regular-12"}>
          {col.title}
        </Text>
        <SortArrow
          active={sortKey === "preparedAt"}
          dir={sortKey === "preparedAt" ? sortDir : null}
        />
      </button>
    ),
  },
  {
    key: "servedAt",
    title: "Отдали",
    width: 100,
    isHeaderActive: sortKey === "servedAt",
    headerRender: (col) => (
      <button
        type="button"
        onClick={() => onSort?.(col.key)}
        className="flex h-full w-full cursor-pointer items-center justify-center gap-2 border-none bg-transparent p-0"
      >
        <Text variant={sortKey === "servedAt" ? "label-s-semibold-12" : "label-s-regular-12"}>
          {col.title}
        </Text>
        <SortArrow active={sortKey === "servedAt"} dir={sortKey === "servedAt" ? sortDir : null} />
      </button>
    ),
  },
  {
    key: "promisedIn",
    title: "Обещали",
    width: 100,
  },
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
