import { OrderListProps } from "@/widgets/Order/ui/OrderList/OrderList.types";

export interface OrderPreviewModalProps extends OrderListProps {
  orderNumber: number;
  isOpen: boolean;
  onClose: () => void;
}