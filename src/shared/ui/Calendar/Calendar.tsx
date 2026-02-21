"use client";

import { DayPicker } from "react-day-picker";
import { ru } from "date-fns/locale";
import "./Calendar.styles.css"; // Наши стили
import { CalendarProps } from "./Calendar.types";

export const Calendar = ({ value, onChange, ...props }: CalendarProps) => {
  return (
    <div className="calendar-root">
      <DayPicker
        mode="single"
        selected={value}
        onSelect={onChange}
        locale={ru}
        showOutsideDays
        // Убираем переопределение классов, теперь все стили в CSS
        classNames={{
          // Можно оставить пустым или переопределить только то, что не описывали в CSS
          // Но лучше управлять всем через CSS для единообразия
        }}
        {...props}
      />
    </div>
  );
};