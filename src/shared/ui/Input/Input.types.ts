import React from "react";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "type"
  > {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  type?: React.HTMLInputTypeAttribute;

  label?: string;
  error?: string;
  helperText?: string;
}
