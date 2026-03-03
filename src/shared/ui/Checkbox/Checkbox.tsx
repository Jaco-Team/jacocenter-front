"use client";

import { useId } from "react";
import Image from "next/image";
import "./Checkbox.styles.css";
import { CheckboxProps } from "./Checkbox.types";

export const Checkbox = ({
  checked = false,
  onChange,
  text,
  className = "",
  disabled,
  ...rest
}: CheckboxProps) => {
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div className={`checkbox-root ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="checkbox-input"
        {...rest}
      />
      <label htmlFor={id} className="checkbox-label-container">
        <span className={`checkbox-control ${checked ? "checked" : ""}`}>
          {checked && (
            <Image
              src="/icons/checkmark-success.svg"
              alt="✓"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          )}
        </span>
        {text && <span className="checkbox-label">{text}</span>}
      </label>
    </div>
  );
};