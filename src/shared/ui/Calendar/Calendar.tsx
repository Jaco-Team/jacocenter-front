"use client";

import { DayPicker, useDayPicker, type MonthCaptionProps } from "react-day-picker";
import { ru } from "date-fns/locale";
import { format, isBefore, startOfDay } from "date-fns";
import "./Calendar.styles.css";
import { CalendarProps } from "./Calendar.types";
import LeftArrowIcon from "../../../../public/icons/arrow-left.svg?react";
import RightArrowIcon from "../../../../public/icons/arrow-right.svg?react";

// Функция для капитализации первой буквы
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Кастомный заголовок со стрелками по бокам
function CustomCaption({ calendarMonth }: MonthCaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const monthDate = calendarMonth.date;

  // Формат "Месяц, ГГГГ" с заглавной буквы
  const monthYear = capitalize(format(monthDate, "LLLL, yyyy", { locale: ru }));

  return (
    <div className="custom-caption">
      <button
        type="button"
        className="nav-button prev"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        aria-label="Предыдущий месяц"
      >
        <LeftArrowIcon className="nav-icon" />
      </button>
      <span className="caption-label">{monthYear}</span>
      <button
        type="button"
        className="nav-button next"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        aria-label="Следующий месяц"
      >
        <RightArrowIcon className="nav-icon" />
      </button>
    </div>
  );
}

export const Calendar = ({ value, onChange, ...props }: CalendarProps) => {
  const today = startOfDay(new Date());

  // Модификатор для прошедших дат (до сегодняшнего дня включительно? нет, именно до сегодня)
  const modifiers = {
    past: (date: Date) => isBefore(date, today),
  };

  const modifiersClassNames = {
    past: "rdp-day_past",
  };

  // Форматтер для дней недели: заглавные буквы (Пн, Вт, Ср...)
  const formatters = {
    formatWeekdayName: (date: Date) => {
      const day = format(date, "EEEEEE", { locale: ru }); // "пн", "вт", ...
      return capitalize(day);
    },
  };

  return (
    <div className="calendar-root">
      <DayPicker
        mode="single"
        selected={value}
        onSelect={onChange}
        locale={ru}
        showOutsideDays
        hideNavigation
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        formatters={formatters}
        components={{
          MonthCaption: CustomCaption,
        }}
        {...props}
      />
    </div>
  );
};
