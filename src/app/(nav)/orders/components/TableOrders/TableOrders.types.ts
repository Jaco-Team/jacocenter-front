import { orderStatus } from "@/widgets/orders/utils/constants";

export type Order = {
  orderNumber: number;
  status: keyof typeof orderStatus;
  type: keyof typeof orderStatus;
  createdBy: 'Клиент' | 'Кухня';
  phone: string;
  address: string;
  openedAt: string;
  dueTime: string;
  closedAtKitchen: string;
  receivedAt: string;
  timeToOverdue: string;
  promisedAt: string;
  amount: number;
  payment: string;
  driver: string;
}