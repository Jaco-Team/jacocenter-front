import { SearchResult } from "@/app/(nav)/delivery-map/components/Map/SearchInput.types";
import { create } from "zustand";

type MapSearchResult = SearchResult & { 
  inDeliveryZone: boolean,
  cafeId: string | null;
};

interface MapState {
  searchResult: MapSearchResult | null;
  selectedCafeId: string | null;
}

interface MapActions {
  setSearchResult: (result: MapSearchResult | null) => void;
  toggleCafe: (id: string) => void;
  selectCafe: (id: string | null) => void;
  resetMap: () => void;
}

const initialState: MapState = {
  searchResult: null,
  selectedCafeId: null,
};

export const useMapStore = create<MapState & MapActions>((set) => ({
  ...initialState,
  setSearchResult: (searchResult) => set({ searchResult }),
  toggleCafe: (id) =>
    set((s) => ({ selectedCafeId: s.selectedCafeId === id ? null : id })),
  selectCafe: (selectedCafeId) => set({ selectedCafeId }),
  resetMap: () => set(initialState),
}));
