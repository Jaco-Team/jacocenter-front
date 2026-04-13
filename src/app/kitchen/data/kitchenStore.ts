import { create } from 'zustand';
import { mockKitchenOrders } from './kitchenOrders.mock';

type KitchenStore = {
  city: string;
  cafe: string;
  orderNumber: string;
  openSelect: 'cities' | 'cafes' | null;
  isSettingsOpen: boolean;
  searched: boolean;
  foundRow: number | null;

  setOrderNumber: (orderNumber: string) => void;
  setCity: (city: string) => void;
  setCafe: (cafe: string) => void;
  toggleSelect: (name: 'cities' | 'cafes' ) => void;
  toggleSettings: () => void;
  clearOrderNumber: () => void;
  search: () => void;
}

export const useKitchenStore = create<KitchenStore>((set, get) => ({
  city: '',
  cafe: '',
  orderNumber: '',
  openSelect: null,
  isSettingsOpen: false,
  searched: false,
  foundRow: null,

  setCity: (city) => set({ city, searched: false }),
  setCafe: (cafe) => set({ cafe, searched: false }),
  setOrderNumber: (orderNumber) => set({ orderNumber, searched: false }),
  toggleSelect: (name) => set((state) => ({ openSelect: state.openSelect === name ? null : name })),
  toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
  clearOrderNumber: () => set({ orderNumber: '', searched: false, foundRow: null }),
  search: () => {
    const { city, cafe, orderNumber } = get();

    const found = mockKitchenOrders.findIndex(order =>
      (!city || order.city === city) &&
      (!cafe || order.cafe === cafe) &&
      (!orderNumber || String(order.number) === orderNumber)
    );

    set({ foundRow: found === -1 ? null : found, searched: true });
  },
}));