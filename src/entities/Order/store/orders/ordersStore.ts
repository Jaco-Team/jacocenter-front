import { create } from "zustand";
import { getOrdersColumns } from "@/app/(nav)/orders/components/TableOrders/TableOrders.columns";
import { format } from "date-fns";
import { StatusTabId, TypeTabId } from "@/widgets/orders/utils/constants";

type SortDir = "asc" | "desc" | null;

type OrdersStore = {
  selectedPointId: number | null;
  date: string;
  cityId: number | null;
  phone: string;
  address: string;
  searchQuery: string;
  visibleColumns: Record<string, boolean>;
  statusFilter: Record<string, boolean>;
  typeFilter: Record<string, boolean>;
  createdByFilter: Record<string, boolean>;
  statusTab: StatusTabId;
  typeTab: TypeTabId;
  sortKey: string | null;
  sortDir: SortDir;
  refreshKey: number;
  setSelectedPointId: (pointId: number | null) => void;
  setDate: (date: string) => void;
  setCityId: (cityId: number | null) => void;
  setPhone: (phone: string) => void;
  setAddress: (address: string) => void;
  setSearchQuery: (query: string) => void;
  setVisibleColumns: (columns: Record<string, boolean>) => void;
  setStatusFilter: (filter: Record<string, boolean>) => void;
  setTypeFilter: (filter: Record<string, boolean>) => void;
  setCreatedByFilter: (filter: Record<string, boolean>) => void;
  setStatusTab: (tab: StatusTabId) => void;
  setTypeTab: (tab: TypeTabId) => void;
  toggleSort: (key: string) => void;
  triggerRefresh: () => void;
};

const PRIMARY_COLUMNS = ["№", "ТИП", "СТАТУС", "ОФОРМЛЕН", "ПРИГОТОВЛЕН", "ЗАВЕРШЁН", "СУММА"];

const defaultVisibleColumns = Object.fromEntries(
  getOrdersColumns(null, null, null).map((col) => [
    col.title,
    PRIMARY_COLUMNS.includes(col.title),
  ]),
);

export const useOrdersStore = create<OrdersStore>((set) => ({
  selectedPointId: null,
  date: format(new Date(), "dd.MM.yyyy"),
  cityId: null,
  phone: "",
  address: "",
  searchQuery: "",
  visibleColumns: defaultVisibleColumns,
  statusFilter: {
    Новый: true,
    Готовится: true,
    Едет: true,
    Готов: true,
    Отмена: true,
    Завершён: true,
  },
  typeFilter: {
    Зал: true,
    Доставка: true,
    Самовывоз: true,
    "С собой": true,
  },
  createdByFilter: {
    Клиент: true,
    Кухня: true,
  },
  statusTab: "active",
  typeTab: "all",
  sortKey: "openedAt",
  sortDir: "desc",
  refreshKey: 0,
  setSelectedPointId: (selectedPointId) => set({ selectedPointId }),
  setDate: (date) => set({ date }),
  setCityId: (cityId) => set({ cityId, selectedPointId: null }),
  setPhone: (phone) => set({ phone }),
  setAddress: (address) => set({ address }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setVisibleColumns: (visibleColumns) => set({ visibleColumns }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  setTypeFilter: (filter) => set({ typeFilter: filter }),
  setCreatedByFilter: (filter) => set({ createdByFilter: filter }),
  setStatusTab: (statusTab) => set({ statusTab }),
  setTypeTab: (typeTab) => set({ typeTab }),
  toggleSort: (key) =>
    set((state) => {
      if (state.sortKey !== key) return { sortKey: key, sortDir: "asc" };
      if (state.sortDir === "asc") return { sortDir: "desc" };
      if (state.sortDir === "desc") return { sortKey: null, sortDir: null };
      return { sortKey: key, sortDir: "asc" };
    }),
  triggerRefresh: () => set((state) => ({ refreshKey: state.refreshKey + 1 })),
}));
