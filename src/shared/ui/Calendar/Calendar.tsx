"use client";

import { DayPicker, useNavigation } from "react-day-picker";
import { ru } from "date-fns/locale";
import { format, isBefore, startOfDay } from "date-fns";
import "./Calendar.styles.css";
import { CalendarProps } from "./Calendar.types";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

function CustomCaption(props: { calendarMonth?: any; locale?: any }) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const locale = props.locale || ru;

  let monthDate: Date;
  if (props.calendarMonth?.date instanceof Date) {
    monthDate = props.calendarMonth.date;
  } else if (props.calendarMonth instanceof Date) {
    monthDate = props.calendarMonth;
  } else {
    monthDate = new Date();
  }

  const monthYear = capitalize(format(monthDate, "LLLL, yyyy", { locale }));

  return (
    <div className="custom-caption">
      <button
        type="button"
        className="nav-button prev"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        aria-label="Предыдущий месяц"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" />
        </svg>
      </button>
      <span className="caption-label">{monthYear}</span>
      <button
        type="button"
        className="nav-button next"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        aria-label="Следующий месяц"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" />
        </svg>
      </button>
    </div>
  );
}

export const Calendar = ({ value, onChange, ...props }: CalendarProps) => {
  const today = startOfDay(new Date());

  const modifiers = {
    past: (date: Date) => isBefore(date, today),
  };

  const modifiersClassNames = {
    past: "rdp-day_past",
  };

  // Форматтер для дней недели: возвращаем с заглавной буквы
  const formatters = {
    formatWeekdayName: (date: Date) => {
      const day = format(date, "EEEEEE", { locale: ru }); // получаем "пн", "вт" и т.д.
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