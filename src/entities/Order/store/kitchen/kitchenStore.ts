import { create } from "zustand";
import { mockKitchenOrders, cafeOptions } from "@/app/(nav)/kitchen/data/kitchenOrders.mock";
import { getKitchenColumns } from "@/app/(nav)/kitchen/components/TableKitchen/TableKitchen.columns";
import { StatusTabId, TypeTabId } from "@/widgets/orders/utils/constants";

type SortDir = "asc" | "desc" | null;

type KitchenStore = {
  city: string;
  cafe: string;
  orderNumber: string;
  searched: boolean;
  foundOrderNumber: number | null;
  statusFilter: Record<string, boolean>;
  typeFilter: Record<string, boolean>;
  visibleColumns: Record<string, boolean>;
  statusTab: StatusTabId;
  typeTab: TypeTabId;
  selectedCafe: string;
  sortKey: string | null;
  sortDir: SortDir;
  refreshKey: number;

  setOrderNumber: (orderNumber: string) => void;
  setCity: (city: string) => void;
  setCafe: (cafe: string) => void;
  setSelectedCafe: (cafe: string) => void;
  clearOrderNumber: () => void;
  setStatusFilter: (filter: Record<string, boolean>) => void;
  setTypeFilter: (filter: Record<string, boolean>) => void;
  setVisibleColumns: (columns: Record<string, boolean>) => void;
  setStatusTab: (tab: StatusTabId) => void;
  setTypeTab: (tab: TypeTabId) => void;
  toggleSort: (key: string) => void;
  triggerRefresh: () => void;
  search: () => void;
};

const PRIMARY_COLUMNS = ["№", "ТИП", "СТАТУС", "ОФОРМЛЕН", "ПРИГОТОВЛЕН", "ЗАВЕРШЁН", "СУММА"];

const defaultVisibleColumns = Object.fromEntries(
  getKitchenColumns(null, null, null).map((col) => [
    col.title,
    PRIMARY_COLUMNS.includes(col.title),
  ]),
);

export const useKitchenStore = create<KitchenStore>((set, get) => ({
  city: "",
  cafe: "",
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
  selectedCafe: cafeOptions[0],
  sortKey: "orderedAt",
  sortDir: "desc",
  refreshKey: 0,

  setCity: (city) => set({ city, searched: false }),
  setCafe: (cafe) => set({ cafe, searched: false }),
  setSelectedCafe: (selectedCafe) => set({ selectedCafe }),
  setOrderNumber: (orderNumber) => set({ orderNumber, searched: false }),
  clearOrderNumber: () => set({ orderNumber: "", searched: false, foundOrderNumber: null }),
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
  search: () => {
    const { orderNumber } = get();
    if (!orderNumber.trim()) return;

    const found = mockKitchenOrders.find(
      (order) => String(order.number) === orderNumber.trim(),
    );

    if (!found) {
      set({ foundOrderNumber: null, searched: true });
      return;
    }

    let nextStatusTab: StatusTabId = "active";
    if (found.status === "cancel") nextStatusTab = "cancelled";
    else if (found.status === "completed") nextStatusTab = "completed";
    else if (found.isPreorder) nextStatusTab = "preorder";

    set({
      foundOrderNumber: found.number,
      searched: true,
      selectedCafe: found.cafe,
      statusTab: nextStatusTab,
      typeTab: "all",
    });
  },
}));
