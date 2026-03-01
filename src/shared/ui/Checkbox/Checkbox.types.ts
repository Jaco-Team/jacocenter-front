import { InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "checked" | "onChange"> {
  /** Состояние чекбокса */
  checked?: boolean;
  /** Колбэк при изменении */
  onChange?: (checked: boolean) => void;
  /** Текст справа от чекбокса (опционально) */
  text?: string;
}