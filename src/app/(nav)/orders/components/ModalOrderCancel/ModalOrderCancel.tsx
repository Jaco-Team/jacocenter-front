import { Button } from "@/shared/ui/Button/Button";
import { Checkbox } from "@/shared/ui/Checkbox/Checkbox";
import { Input } from "@/shared/ui/Input/Input";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Text } from "@/shared/ui/Typography/Typography";
import "./ModalOrderCancel.style.css";
import { useState } from "react";
import { ModalOrderCancelProps } from "./ModalOrderCancel.types";
import { cancelReasons } from "../../constants";

export const ModalOrderCancel = ({isOpen, onClose, onCancel, orderNumber }: ModalOrderCancelProps) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState('');

  const handleClose = () => {
    setSelectedReason(null);
    setOtherReason("");
    onClose();
  }

  return (
    <Modal title={`Отмена заказа № ${orderNumber}`} isOpen={isOpen} onClose={handleClose} isAccent>
      <div className="order-cancel-container">
        <Text>Причина отмены</Text>
          <ul className="cancel-reasons-list">
            {cancelReasons.map((item) => (
              <li key={item} className="cancel-reasons-item">
                <Checkbox 
                  text={item} 
                  checked={selectedReason === item} 
                  onChange={() => {
                    setSelectedReason(item);
                    if (item !== 'Другое') setOtherReason('');
                  }}
                  className="cancel-item-checkbox"
                />
              </li>
            ))}
          </ul>
          <Input 
            placeholder="Другая причина отмены"
            value={otherReason}
            onChange={(e) => {
              const value = e.target.value;
              setOtherReason(value);
              if (value.length > 0) setSelectedReason('Другое');
            }}
          />
        <div className="order-cancel-btns-group">
          <Button variant="base" theme="secondary" className="order-cancel-btn" onClick={handleClose}>
            <Text>К заказу</Text>
          </Button>
          <Button variant="base" theme="error" className="order-cancel-btn" onClick={() => {onCancel(); handleClose();}}>
            <Text>Отменить заказ</Text>
          </Button>
        </div>
      </div>
    </Modal>
  );
}