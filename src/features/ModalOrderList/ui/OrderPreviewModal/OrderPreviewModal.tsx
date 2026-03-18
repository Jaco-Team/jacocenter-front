import { Button } from "@/shared/ui/Button/Button";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Text } from "@/shared/ui/Typography/Typography";
import { OrderList } from "@/widgets/Order/ui/OrderList/OrderList";
import { OrderPreviewModalProps } from "./OrderPreviewModal.types";
import "./OrderPreviewModal.style.css";

export const OrderPreviewModal: React.FC<OrderPreviewModalProps> = ({
  isOpen,
  onClose,
  orderNumber,
  items, 
  totalPrice
}) => {
  const title = (
    <div className="title">
      <Text variant="body-m-medium-16">Предпросмотр</Text>
      <Text>Заказ № {orderNumber}</Text>
    </div>
  );
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose} isAccent={false}>
      <OrderList items={items} totalPrice={totalPrice} className="order-list"/>
      <div className="button-container">
        <Button variant="base" theme="primary" className="button" onClick={onClose}>Ок</Button>
      </div>
    </Modal>
  );
};
