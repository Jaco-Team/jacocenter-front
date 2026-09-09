import { create } from "zustand";
import { customerApi } from "@/entities/customer/api/customerApi";
import type { CustomerLookup } from "@/entities/customer/model/types";

interface SearchFormStore {
  phone: string;
  searched: boolean;
  loading: boolean;
  error: string | null;
  lookup: CustomerLookup | null;
  foundClientId: number | null;
  setPhone: (phone: string) => void;
  search: () => Promise<void>;
}

export const useSearchFormStore = create<SearchFormStore>((set, get) => ({
  phone: "",
  searched: false,
  loading: false,
  error: null,
  lookup: null,
  foundClientId: null,

  setPhone: (phone) => set({ phone, searched: false, loading: false, error: null, lookup: null, foundClientId: null }),

  search: async () => {
    const { phone } = get();
    set({ loading: true, error: null, searched: false });
    try {
      const lookup = await customerApi.lookup(phone);
      set({ lookup, foundClientId: lookup.customer?.id ?? null, searched: true, loading: false });
    } catch (error) {
      set({ lookup: null, foundClientId: null, searched: true, loading: false, error: error instanceof Error ? error.message : "Не удалось найти клиента" });
    }
  },
}));
