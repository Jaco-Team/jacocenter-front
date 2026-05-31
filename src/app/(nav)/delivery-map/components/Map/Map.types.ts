import { ReactifiedModule } from "@yandex/ymaps3-types/reactify/reactify";

export type ReactifiedApi = ReactifiedModule<typeof ymaps3>;

export type MapProps = {
  selectedCafeId: string | null;
  onToggleCafe: (id: string) => void;
  onSelectCafe: (id: string | null) => void;
};
