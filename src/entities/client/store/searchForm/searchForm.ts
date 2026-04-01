import { create } from "zustand";
import { clients } from "@/widgets/clients/utils/constants";

interface SearchFormStore {
  foundClientId: number | null;
  search: (phoneNumber: string) => void;
  reset: () => void;
}

function normalizeDigits(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "").slice(-10);
}

export const useSearchFormStore = create<SearchFormStore>((set) => ({
  foundClientId: null,

  search: (phoneNumber) => {
    const found = clients.find((client) => normalizeDigits(client.phone) === normalizeDigits(phoneNumber));

    set({ foundClientId: found?.id ?? null });
  },

  reset: () => set({ foundClientId: null }),
}));