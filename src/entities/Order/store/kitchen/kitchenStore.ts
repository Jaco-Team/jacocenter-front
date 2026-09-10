import { create } from "zustand";
import { format } from "date-fns";
import { getKitchenColumns } from "@/app/(nav)/kitchen/components/TableKitchen/TableKitchen.columns";
import { StatusTabId, TypeTabId } from "@/widgets/orders/utils/constants";

type SortDir = "asc" | "desc" | null;

type KitchenStore = {
  selectedPointId: number | null;
  cityId: number | null;
  date: string;
  orderNumber: string;
  searched: boolean;
  foundOrderNumber: number | null;
  statusFilter: Record<string, boolean>;
  typeFilter: Record<string, boolean>;
  visibleColumns: Record<string, boolean>;
  statusTab: StatusTabId;
  typeTab: TypeTabId;
  sortKey: string | null;
  sortDir: SortDir;
  refreshKey: number;

  setSelectedPointId: (pointId: number | null) => void;
  setCityId: (cityId: number | null) => void;
  setDate: (date: string) => void;
  setOrderNumber: (orderNumber: string) => void;
  clearOrderNumber: () => void;
  setFoundOrder: (payload: {
    foundOrderNumber: number | null;
    searched: boolean;
    cityId?: number | null;
    selectedPointId?: number | null;
    statusTab?: StatusTabId;
  }) => void;
  setStatusFilter: (filter: Record<string, boolean>) => void;
  setTypeFilter: (filter: Record<string, boolean>) => void;
  setVisibleColumns: (columns: Record<string, boolean>) => void;
  setStatusTab: (tab: StatusTabId) => void;
  setTypeTab: (tab: TypeTabId) => void;
  toggleSort: (key: string) => void;
  triggerRefresh: () => void;
};

const PRIMARY_COLUMNS = ["№", "ТИП", "СТАТУС", "ОФОРМЛЕН", "ПРИГОТОВЛЕН", "ЗАВЕРШЁН", "СУММА"];

const defaultVisibleColumns = Object.fromEntries(
  getKitchenColumns(null, null, null).map((col) => [
    col.title,
    PRIMARY_COLUMNS.includes(col.title),
  ]),
);

export const useKitchenStore = create<KitchenStore>((set) => ({
  selectedPointId: null,
  cityId: null,
  date: format(new Date(), "dd.MM.yyyy"),
  orderNumber: "",
  searched: false,
  foundOrderNumber: null,
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
  visibleColumns: defaultVisibleColumns,
  statusTab: "active",
  typeTab: "all",
  sortKey: "orderedAt",
  sortDir: "desc",
  refreshKey: 0,

  setSelectedPointId: (selectedPointId) => set({ selectedPointId }),
  setCityId: (cityId) => set({ cityId, selectedPointId: null }),
  setDate: (date) => set({ date }),
  setOrderNumber: (orderNumber) => set({ orderNumber, searched: false }),
  clearOrderNumber: () => set({ orderNumber: "", searched: false, foundOrderNumber: null }),
  setFoundOrder: ({ foundOrderNumber, searched, cityId, selectedPointId, statusTab }) =>
    set({
      foundOrderNumber,
      searched,
      ...(cityId !== undefined ? { cityId } : {}),
      ...(selectedPointId !== undefined ? { selectedPointId } : {}),
      ...(statusTab !== undefined ? { statusTab, typeTab: "all" as TypeTabId } : {}),
    }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  setTypeFilter: (filter) => set({ typeFilter: filter }),
  setVisibleColumns: (visibleColumns) => set({ visibleColumns }),
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
