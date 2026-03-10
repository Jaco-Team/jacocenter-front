import { ORDER_STEP } from "@/utils/constants";

export interface CartProps {
  items: CartItem[];
  deliveryPrice?: number;
  onOpenOrderInfo: () => void;
  onCancel: () => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onDelete: (id: string) => void;
  onNext: () => void;
  step: ORDER_STEP;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discountText?: string;
  count: number;
}