import type { Order } from "@/app/(nav)/orders/components/TableOrders/TableOrders.types";

export type FiltersBlockProps = {
  points: Array<{ id: number; address: string }>;
  orders: Order[];
}