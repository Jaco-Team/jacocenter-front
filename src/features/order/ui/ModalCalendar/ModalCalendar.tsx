import { useState } from "react";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { Button } from "@/shared/ui/Button/Button";
import { Calendar } from "@/shared/ui/Calendar/Calendar";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Text } from "@/shared/ui/Typography/Typography";
import { ModalCalendarProps } from "./ModalCalendar.types";
import "./ModalCalendar.style.css";


export const ModalCalendar = ({ isOpen, onClose, onSelect }: ModalCalendarProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();

  const today = startOfDay(new Date());
  const tomorrow = startOfDay(addDays(new Date(), 1));

  const handleClose = () => {
    setSelectedDay(undefined);
    onClose();
  }

  return (
    <Modal title="Выбор даты" isOpen={isOpen} onClose={handleClose}>
      <div className="day-select-container">
        <div className="days-tab-group">
          <Button 
            variant="base" 
            theme="primary" 
            onClick={() => setSelectedDay(today)}
            className={`days-tab ${selectedDay && isSameDay(selectedDay, today) ? "days-tab-active" : ""}`}>
            <Text>Сегодня</Text>
            <Text>{format(today, "dd.MM.yy")}</Text>
          </Button>
          <Button 
            variant="base" 
            theme="primary" 
            onClick={() => setSelectedDay(tomorrow)}
            className={`days-tab ${selectedDay && isSameDay(selectedDay, tomorrow) ? "days-tab-active" : ""}`}>
            <Text>Завтра</Text>
            <Text>{format(tomorrow, "dd.MM.yy")}</Text>
          </Button>
        </div>
        <Text variant="label-s-regular-12" className="calendar-label">Или выберите дату в календаре</Text>
        <Calendar value={selectedDay} onChange={setSelectedDay}/>
        <div className="modal-calendar-buttons">
          <Button 
            variant="base" 
            theme="secondary" 
            onClick={handleClose}
            className="modal-calendar-cancel-btn"
          >
            <Text>Отмена</Text>
          </Button>
          <Button 
            variant="base" 
            theme={selectedDay ? "primary" :"secondary"}
            onClick={() => {
              if (!selectedDay) return;
              onSelect(format(selectedDay, "dd.MM.yyyy"));
              setSelectedDay(undefined);
              onClose();
            }}
            className="modal-calendar-select-btn"
          >
            <Text>Выбрать</Text>
          </Button>
        </div>
      </div>
    </Modal>
  );
}