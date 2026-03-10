import React, { forwardRef, useId } from "react";
import { InputProps } from "./Input.types";
import "./Input.styles.css";
import Image from "next/image";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      type = "text",
      label,
      error,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="input-root">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          className={`input-field ${error ? "input-error" : ""}`}
          {...props}
        />

        {error ? (
          <div className="input-message error">
            <Image
              src="/icons/warning-triangle.svg"
              alt="Ошибка"
              width={14}
              height={14}
            />
            <span>{error}</span>
          </div>
        ) : (
          helperText && (
            <div className="input-message helper">
              <Image
                src="/icons/checkmark-success.svg"
                alt="Успешно"
                width={14}
                height={14}
              />
              <span>{helperText}</span>
            </div>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
