import { DayPickerProps } from "react-day-picker";

export interface CalendarProps extends Omit<DayPickerProps, "mode" | "selected" | "onSelect"> {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}