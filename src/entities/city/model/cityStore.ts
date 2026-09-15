import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type CitySelection = {
  cityId: number | null;
  cityName: string | null;
};

type CityStore = CitySelection & {
  setCity: (city: CitySelection) => void;
  setCityId: (cityId: number | null) => void;
  clearCity: () => void;
};

const initialState: CitySelection = { cityId: null, cityName: null };

/** The operator's last city, shared by order-related screens. */
export const useCityStore = create<CityStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCity: (city) => set(city),
      setCityId: (cityId) => set({ cityId }),
      clearCity: () => set(initialState),
    }),
    {
      name: 'callcenter-city-selection',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ cityId, cityName }) => ({ cityId, cityName }),
    },
  ),
);

