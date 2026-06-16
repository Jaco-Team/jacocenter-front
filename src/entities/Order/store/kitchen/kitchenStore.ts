import { create } from 'zustand';
import { mockKitchenOrders } from '@/app/(nav)/kitchen/data/kitchenOrders.mock';
import { getKitchenColumns } from '@/app/(nav)/kitchen/components/TableKitchen/TableKitchen.columns';

type KitchenStore = {
  city: string;
  cafe: string;
  orderNumber: string;
  searched: boolean;
  foundRow: number | null;
  statusFilter: Record<string, boolean>;
  typeFilter: Record<string, boolean>;
  visibleColumns: Record<string, boolean>;

  setOrderNumber: (orderNumber: string) => void;
  setCity: (city: string) => void;
  setCafe: (cafe: string) => void;
  clearOrderNumber: () => void;
  setStatusFilter: (filter: Record<string, boolean>) => void;
  setTypeFilter: (filter: Record<string, boolean>) => void;
  setVisibleColumns: (columns: Record<string, boolean>) => void;
  search: () => void;
}

const defaultVisibleColumns = Object.fromEntries(
  getKitchenColumns(null).map(col => [col.title, true])
);

export const useKitchenStore = create<KitchenStore>((set, get) => ({
  city: '',
  cafe: '',
  orderNumber: '',
  searched: false,
  foundRow: null,
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
  visibleColumns: defaultVisibleColumns,

  setCity: (city) => set({ city, searched: false }),
  setCafe: (cafe) => set({ cafe, searched: false }),
  setOrderNumber: (orderNumber) => set({ orderNumber, searched: false }),
  clearOrderNumber: () => set({ orderNumber: '', searched: false, foundRow: null }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  setTypeFilter: (filter) => set({ typeFilter: filter }),
  setVisibleColumns: (visibleColumns) => set({ visibleColumns }),
  search: () => {
    const { city, cafe, orderNumber } = get();
    if (!orderNumber) return;

    const found = mockKitchenOrders.findIndex(order =>
      (!city || order.city === city) &&
      (!cafe || order.cafe === cafe) &&
      (!orderNumber || String(order.number) === orderNumber)
    );

    set({ foundRow: found === -1 ? null : found, searched: true });
  },
}));