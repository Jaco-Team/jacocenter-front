import { create } from "zustand";
import { getOrdersColumns } from "@/app/(nav)/orders/components/TableOrders/TableOrders.columns";

type OrdersStore = {
  visibleColumns: Record<string, boolean>;
  setVisibleColumns: (columns: Record<string, boolean>) => void;
}

const defaultVisibleColumns = Object.fromEntries(
  getOrdersColumns(null).map(col => [col.title, true])
);

export const useOrdersStore = create<OrdersStore>((set) => ({
  visibleColumns: defaultVisibleColumns,
  setVisibleColumns: (visibleColumns) => set({ visibleColumns }),
}));