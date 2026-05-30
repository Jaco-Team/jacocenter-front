import type { LngLat } from "@yandex/ymaps3-types";

export type SearchInputProps = {
  onSelectAddress: (coords: LngLat | null) => void;
  className?: string;
};
