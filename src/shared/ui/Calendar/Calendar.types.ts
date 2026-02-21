import { DayPickerProps } from "react-day-picker";

export interface CalendarProps extends Omit<DayPickerProps, "mode" | "selected" | "onSelect"> {
  /** Выбранная дата */
  value?: Date;
  /** Колбэк при изменении даты */
  onChange?: (date: Date | undefined) => void;
}