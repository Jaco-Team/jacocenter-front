export interface OrderDishProps {
  name: string;
  count: number;
  price: number;
  oldPrice?: number;
  discountText?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}
