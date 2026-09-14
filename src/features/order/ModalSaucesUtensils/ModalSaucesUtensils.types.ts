export interface SauceUtensilItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export interface ModalSaucesUtensilsProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip: () => void;
  onDone: (items: { id: string; name: string; price: number; count: number }[]) => void;
  items: SauceUtensilItem[];
}
