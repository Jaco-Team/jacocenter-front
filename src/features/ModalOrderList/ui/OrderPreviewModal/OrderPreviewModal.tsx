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
  totalPrice,
  deliveryPrice = 0,
}) => {
  const title = (
    <div className="order-preview-title">
      <Text variant="body-m-medium-16">Предпросмотр</Text>
      <Text>Заказ № {orderNumber}</Text>
    </div>
  );
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose} isAccent={false}>
      <OrderList items={items} totalPrice={totalPrice} deliveryPrice={deliveryPrice} className="order-preview-list"/>
      <div className="order-preview-button-container">
        <Button variant="base" theme="primary" className="order-preview-button" onClick={onClose}>Ок</Button>
      </div>
    </Modal>
  );
};
