import { orderStatus } from "@/widgets/orders/utils/constants";

export type KitchenOrder = {
  number: number;
  status: keyof typeof orderStatus;
  type: keyof typeof orderStatus;
  orderedAt: string;
  readyAt?: string;
  assembledAt?: string;
  closedAt?: string;
  preparedAt?: string;
  servedAt?: string;
  promisedIn?: string;
}