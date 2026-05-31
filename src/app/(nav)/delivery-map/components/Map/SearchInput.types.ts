import type { LngLat } from "ymaps3";

export type SearchResult = {
  coords: LngLat;
  address: string;
};

export type SearchInputProps = {
  onSelectAddress: (result: SearchResult | null) => void;
  className?: string;
};
