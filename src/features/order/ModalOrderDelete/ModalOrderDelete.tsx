import { Button } from "@/shared/ui/Button/Button";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Text } from "@/shared/ui/Typography/Typography";
import Image from "next/image";
import './ModalOrderDelete.style.css';
import { ModalOrderDeleteProps } from "./ModalOrderDelete.types";

export const ModalOrderDelete = ({
  isOpen,
  onClose,
  onCancelOrder,
}: ModalOrderDeleteProps ) => {

  return (
    <Modal title={"Подтверждение отмены заказа"} isOpen={isOpen} onClose={onClose} isAccent={true}>
      <div className="modal-warning-content">
        <Text variant="body-l-regular-20">
          Клиент желает отменить заказ<br/> 
          на этапе оформления?
        </Text>
        <div className="warning-group">
          <Image
            src="/icons/info-error.svg"
            alt="Ошибка"
            width={25}
            height={25}
          />
          <Text className="warning-text">В случае отмены корзина будет очищена без возможности восстановить заказ</Text>
        </div>
        <div className="buttons-group">
          <Button variant="base" theme="secondary" className="button" onClick={onClose}>
            <Text>К заказу</Text>
          </Button>
          <Button variant="base" theme="error" className="button" onClick={onCancelOrder}>
            <Text variant="body-m-medium-16">Да, отменить</Text>
          </Button>
        </div>
      </div>
    </Modal>
  );
};