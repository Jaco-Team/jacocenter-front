import { Button } from "@/shared/ui/Button/Button";
import { Modal } from "@/shared/ui/Modal/Modal"
import { Text } from "@/shared/ui/Typography/Typography";
import { useState } from "react";
import "./ModalTimeSelect.style.css";
import { ModalTimeSelectProps } from "./ModalTimeSelect.types";

export const ModalTimeSelect = ({ isOpen, onClose, onTimeSelect }: ModalTimeSelectProps) => {
  const [activeDayPeriod, setActiveDayPeriod] = useState<"morning" | "day" | "evening" | null>(null);
  const [activeTimePeriod, setActiveTimePeriod] = useState<string | null>(null);

  const timeSlots = {
    morning: [
      "10:00 - 10:30", "10:15 - 10:45", "10:30 - 11:00", "10:45 - 11:15",
      "11:00 - 11:30", "11:15 - 11:45", "11:30 - 12:00", "11:45 - 12:15",
    ],
    day: [
      "12:00 - 12:30", "12:15 - 12:45", "12:30 - 13:00","12:45 - 13:15",
      "13:00 - 13:30", "13:15 - 13:45", "13:30 - 14:00","13:45 - 14:15",
      "14:00 - 14:30", "14:15 - 14:45", "14:30 - 15:00","14:45 - 15:15",
      "15:00 - 15:30", "15:15 - 15:45", "15:30 - 16:00","15:45 - 16:15",
      "16:00 - 16:30", "16:15 - 16:45", "16:30 - 17:00","16:45 - 17:15",
      "17:00 - 17:30", "17:15 - 17:45", "17:30 - 18:00","17:45 - 18:15",
    ],
    evening: [
      "18:00 - 18:30", "18:15 - 18:45", "18:30 - 19:00", "18:45 - 19:15",
      "19:00 - 19:30", "19:15 - 19:45", "19:30 - 20:00", "19:45 - 20:15",
      "20:00 - 20:30", "20:15 - 20:45", "20:30 - 21:00", "20:45 - 21:15",
      "21:00 - 21:30", 
    ]
  };

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
          <Button variant="base" theme="secondary"
            className={`period-button ${activeDayPeriod==="morning"? "period-button-active": ""}`}
            onClick={() => {
              setActiveDayPeriod("morning");
              setActiveTimePeriod(null);
            
            }}
          >
            <Text>Утро 10:00 - 11:45</Text>
          </Button>
          <Button variant="base" theme="secondary"
            className={`period-button ${activeDayPeriod==="day"? "period-button-active": ""}`}
            onClick={() => {
              setActiveDayPeriod("day");
              setActiveTimePeriod(null);
            
            }}
          >
            <Text>День 12:00 - 17:45</Text>
          </Button>
          <Button variant="base" theme="secondary"
            className={`period-button ${activeDayPeriod==="evening"? "period-button-active": ""}`}
            onClick={() => {
              setActiveDayPeriod("evening");
              setActiveTimePeriod(null);
            
            }}
          >
            <Text>Вечер 18:00 - 21:00</Text>
          </Button>
        </div>
        {activeDayPeriod && (
          <div className="time-slots-container">
            <Text variant="label-s-regular-12">Выберите период доставки</Text>
            <ul className="time-slots-list">
              {timeSlots[activeDayPeriod].map((slot) => (
                <li key={slot}>
                  <Button variant="base" theme="secondary"
                    className={activeTimePeriod === slot ? "time-slots-button-active" : "time-slots-button"}
                    onClick={() => setActiveTimePeriod(slot)}
                  >
                    <Text>{slot}</Text>
                  </Button>
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