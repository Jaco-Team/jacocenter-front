import { Button } from "@/shared/ui/Button/Button";
import { Modal } from "@/shared/ui/Modal/Modal"
import { Text } from "@/shared/ui/Typography/Typography";
import { useState } from "react";
import "./ModalTimeSelect.style.css";
import { ModalTimeSelectProps } from "./ModalTimeSelect.types";
import { timeSlots } from "../../utils/mocks";
import { Slot } from "../Slot/Slot";

export const ModalTimeSelect = ({ isOpen, onClose, onTimeSelect }: ModalTimeSelectProps) => {
  const [activeDayPeriod, setActiveDayPeriod] = useState<"morning" | "day" | "evening" | null>(null);
  const [activeTimePeriod, setActiveTimePeriod] = useState<string | null>(null);

  const handleClose = () => {
    setActiveDayPeriod(null);
    setActiveTimePeriod(null);
    onClose();
  }

  return (
    <Modal title="Выбор времени" isOpen={isOpen} onClose={handleClose}>
      <div className="time-select-container">
        <Text variant="label-s-regular-12">Выберите время суток</Text>
        <div className="period-group">
          <Slot 
            variant="daySlot"
            isActive={activeDayPeriod==="morning"}
            onClick={() => {
              setActiveDayPeriod("morning");
              setActiveTimePeriod(null);
            }}
          >
              Утро 10:00 - 11:45
          </Slot>
          <Slot 
            variant="daySlot"
            isActive={activeDayPeriod==="day"}
            onClick={() => {
              setActiveDayPeriod("day");
              setActiveTimePeriod(null);
            }}
          >
            День 12:00 - 17:45
          </Slot>
          <Slot
            variant="daySlot"
            isActive={activeDayPeriod==="evening"}
            onClick={() => {
              setActiveDayPeriod("evening");
              setActiveTimePeriod(null);
            }}
          >
            Вечер 18:00 - 21:00
          </Slot>
        </div>
        
        {activeDayPeriod && (
          <div className="time-slots-container">
            <Text variant="label-s-regular-12">Выберите период доставки</Text>
            <ul className="time-slots-list">
              {timeSlots[activeDayPeriod].map((slot) => (
                <li key={slot}>
                  <Slot 
                    variant="timeSlot"
                    isActive={activeTimePeriod === slot}
                    onClick={() => setActiveTimePeriod(slot)}
                  >
                    {slot}
                  </Slot>
                </li>
              ))}
            </ul>
            <div className="time-slots-btns-group">
              <Button 
                variant="base" 
                theme="secondary" 
                className="time-select-cancel-btn"
                onClick={handleClose}
              >
                <Text>Отмена</Text>
              </Button>
              <Button 
                variant="base" 
                theme={activeTimePeriod ? "primary" : "secondary"} 
                className="time-select-confirm-btn"
                onClick={() => {
                  if (!activeTimePeriod) return;
                  onTimeSelect(activeTimePeriod);
                  handleClose();
                }}
              >
                <Text>Выбрать</Text>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}