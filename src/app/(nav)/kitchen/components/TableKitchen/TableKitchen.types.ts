import { OrderStatusKey, OrderTypeKey } from "@/widgets/orders/utils/constants";

export type KitchenOrder = {
  number: number;
  status: OrderStatusKey;
  type: OrderTypeKey;
  orderedAt: string;
  readyAt?: string;
  assembledAt?: string;
  closedAt?: string;
  preparedAt?: string;
  servedAt?: string;
  promisedIn?: string;
  city: string;
  cafe: string;
  amount: number;
  timeToOverdue: string;
  promisedAt: string;
  receivedAt: string;
  isPreorder?: boolean;
};
