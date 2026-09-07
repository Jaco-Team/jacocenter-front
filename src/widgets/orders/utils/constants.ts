export const orderStatus = {
  cancel: {
    label: "Отмена",
    border: "border-error",
    bg: "bg-base",
    color: "text-accent",
  },
  delivery: {
    label: "Доставка",
    border: "border-[#7B61FF]",
    bg: "bg-base",
    color: "text-text-base",
  },
  room: {
    label: "Зал",
    border: "border-status-hall",
    bg: "bg-base",
    color: "text-text-base",
  },
  takeaway: {
    label: "Самовывоз",
    border: "border-status-pickup",
    bg: "bg-base",
    color: "text-text-base",
  },
  toGo: {
    label: "С собой",
    border: "border-[#F28C28]",
    bg: "bg-base",
    color: "text-text-base",
  },
  inQueue: {
    label: "Новый",
    border: "border-disabled",
    bg: "bg-status-queue",
    color: "text-text-base",
  },
  cooking: {
    label: "Готовится",
    border: "border-transparent",
    bg: "bg-status-pickup",
    color: "text-text-base",
  },
  ready: {
    label: "Готов",
    border: "border-transparent",
    bg: "bg-status-delivery",
    color: "text-text-base",
  },
  inDelivery: {
    label: "Едет",
    border: "border-transparent",
    bg: "bg-status-hall",
    color: "text-text-base",
  },
  completed: {
    label: "Завершён",
    border: "border-transparent",
    bg: "bg-bg-base-light",
    color: "text-text-secondary",
  },
} as const;

export type OrderStatusKey = keyof typeof orderStatus;

export const ORDER_TYPE_KEYS = ["delivery", "takeaway", "room", "toGo"] as const;
export type OrderTypeKey = (typeof ORDER_TYPE_KEYS)[number];

export const ORDER_TYPE_ICONS: Record<OrderTypeKey, string> = {
  delivery: "/icons/order-delivery.svg",
  takeaway: "/icons/order-pickup.svg",
  room: "/icons/order-hall.svg",
  toGo: "/icons/order-togo.svg",
};

export const ORDER_TYPE_BORDER: Record<OrderTypeKey, string> = {
  delivery: "border-[#7B61FF]",
  takeaway: "border-[#4B8BFF]",
  room: "border-[#DD1A32]",
  toGo: "border-[#F28C28]",
};

export type StatusTabId = "active" | "completed" | "preorder" | "cancelled";

export const STATUS_TABS: { id: StatusTabId; label: string; statuses: OrderStatusKey[] }[] = [
  { id: "active", label: "Активные", statuses: ["inQueue", "cooking", "inDelivery", "ready"] },
  { id: "completed", label: "Завершённые", statuses: ["completed"] },
  { id: "preorder", label: "Предзаказы", statuses: ["inQueue", "cooking"] },
  { id: "cancelled", label: "Отмененные", statuses: ["cancel"] },
];

export type TypeTabId = "all" | OrderTypeKey;

export const TYPE_TABS: { id: TypeTabId; label: string; icon?: string }[] = [
  { id: "all", label: "Все" },
  { id: "delivery", label: "Доставка", icon: ORDER_TYPE_ICONS.delivery },
  { id: "takeaway", label: "Самовывоз", icon: ORDER_TYPE_ICONS.takeaway },
  { id: "room", label: "Зал", icon: ORDER_TYPE_ICONS.room },
  { id: "toGo", label: "С собой", icon: ORDER_TYPE_ICONS.toGo },
];
