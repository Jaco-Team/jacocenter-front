import React, { forwardRef } from "react";
import { InputProps } from "./Input.types";
import "./Input.styles.css";
import Image from "next/image";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, label, error, helperText, ...props }, ref) => {
    return (
      <div className="input-root">
        {label && <label className="input-label">{label}</label>}

        <input
          ref={ref}
          value={value}
          onChange={onChange}
          className={`input-field ${error ? "input-error" : ""}`}
          {...props}
        />

        {error ? (
          <div className="input-message error">
            <Image
              src='/icons/warning-triangle.svg'
              alt='Ошибка'
              width={14}
              height={14}
            ></Image>
            <span>{error}</span>
          </div>
        ) : (
          helperText && (
            <div className="input-message helper">
              <Image
                src='/icons/checkmark-success.svg'
                alt='Успешно'
                width={14}
                height={14}
              ></Image>
              <span>{helperText}</span>
            </div>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
