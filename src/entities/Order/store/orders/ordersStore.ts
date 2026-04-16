import { create } from "zustand";
import { getOrdersColumns } from "@/app/(nav)/orders/components/TableOrders/TableOrders.columns";

type OrdersStore = {
  visibleColumns: Record<string, boolean>;
  statusFilter: Record<string, boolean>;
  typeFilter: Record<string, boolean>;
  createdByFilter: Record<string, boolean>;
  setVisibleColumns: (columns: Record<string, boolean>) => void;
  setStatusFilter: (filter: Record<string, boolean>) => void;
  setTypeFilter: (filter: Record<string, boolean>) => void;
  setCreatedByFilter: (filter: Record<string, boolean>) => void;
}

const defaultVisibleColumns = Object.fromEntries(
  getOrdersColumns(null).map(col => [col.title, true])
);

export const useOrdersStore = create<OrdersStore>((set) => ({
  visibleColumns: defaultVisibleColumns,
  statusFilter: {
  'В очереди': true,
  'Готовится': true,
  'В пути': true,
  'Готов': true,
  'Отмена': true,
},
typeFilter: {
  'Зал': true,
  'Доставка': true,
  'Самовывоз': true,
},
createdByFilter: {
  'Клиент': true,
  'Кухня': true,
},
  setVisibleColumns: (visibleColumns) => set({ visibleColumns }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  setTypeFilter: (filter) => set({ typeFilter: filter }),
  setCreatedByFilter: (filter) => set({ createdByFilter: filter }),
}));