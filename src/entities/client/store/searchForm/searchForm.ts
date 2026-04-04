import { create } from "zustand";
import { clients } from "@/widgets/clients/utils/constants";

interface SearchFormStore {
  phone: string;
  searched: boolean;
  foundClientId: number | null;
  setPhone: (phone: string) => void;
  search: () => void;
}

function normalizeDigits(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "").slice(-10);
}

export const useSearchFormStore = create<SearchFormStore>((set, get) => ({
  phone: "",
  searched: false,
  foundClientId: null,

  setPhone: (phone) => set({ phone, searched: false, foundClientId: null }),

  search: () => {
    const { phone } = get();

    const found = clients.find((client) => normalizeDigits(client.phone) === normalizeDigits(phone));

    set({ foundClientId: found?.id ?? null, searched: true });
  },
}));