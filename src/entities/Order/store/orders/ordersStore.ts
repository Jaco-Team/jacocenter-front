import { create } from "zustand";
import { getOrdersColumns } from "@/app/(nav)/orders/components/TableOrders/TableOrders.columns";
import { format } from "date-fns";
import { cafeList, cities } from "@/app/(nav)/orders/constants";

type OrdersStore = {
  selectedCafe: string;
  date: string;
  city: string;
  phone: string;
  address: string;
  visibleColumns: Record<string, boolean>;
  statusFilter: Record<string, boolean>;
  typeFilter: Record<string, boolean>;
  createdByFilter: Record<string, boolean>;
  setSelectedCafe: (cafe: string) => void;
  setDate: (date: string) => void;
  setCity: (city: string) => void;
  setPhone: (phone: string) => void;
  setAddress: (address: string) => void;
  setVisibleColumns: (columns: Record<string, boolean>) => void;
  setStatusFilter: (filter: Record<string, boolean>) => void;
  setTypeFilter: (filter: Record<string, boolean>) => void;
  setCreatedByFilter: (filter: Record<string, boolean>) => void;
}

const defaultVisibleColumns = Object.fromEntries(
  getOrdersColumns(null).map(col => [col.title, true])
);

export const useOrdersStore = create<OrdersStore>((set) => ({
  selectedCafe: cafeList[0],
  date: format(new Date(), "dd.MM.yyyy"),
  city: cities[0],
  phone: '',
  address: '',
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
  setSelectedCafe: (cafe) => set({ selectedCafe: cafe }),
  setDate: (date) => set({ date }),
  setCity: (city) => set({ city }),
  setPhone: (phone) => set({ phone }),
  setAddress: (address) => set({ address }),
  setVisibleColumns: (visibleColumns) => set({ visibleColumns }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  setTypeFilter: (filter) => set({ typeFilter: filter }),
  setCreatedByFilter: (filter) => set({ createdByFilter: filter }),
}));