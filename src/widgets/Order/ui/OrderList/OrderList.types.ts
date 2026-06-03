export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderListProps {
  items: OrderItem[];
  totalPrice: number;
  deliveryPrice?: number;
  variant?: 'narrow' | 'wide';
  className?: string;
}