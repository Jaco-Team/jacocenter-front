import { SauceUtensilItem } from "@/app/(nav)/order-new/data/mocks";

export interface ModalSaucesUtensilsProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip: () => void;
  onDone: (items: { id: string; name: string; price: number; count: number }[]) => void;
  items: SauceUtensilItem[];
}
