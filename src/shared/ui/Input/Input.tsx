import React, { forwardRef } from "react";
import { InputProps } from "./Input.types";
import "./Input.styles.css";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="input-root">
        {label && <label className="input-label">{label}</label>}

        <input
          ref={ref}
          placeholder={props.placeholder}
          className={`input-field ${error ? "input-error" : ""} ${className}`}
          {...props}
        />

        {error ? (
          <div className="input-message error">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"><g stroke="#F43331" stroke-linecap="round" stroke-linejoin="round" clip-path="url(#a)"><path d="M7 5v3M7 11.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"/><path d="M7.89 1.05a1 1 0 0 0-1.78 0l-5.5 11a1 1 0 0 0 .89 1.45h11a1 1 0 0 0 .89-1.45l-5.5-11Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h14v14H0z"/></clipPath></defs></svg>
            <span>{error}</span>
          </div>
        ) : (
          helperText && (
            <div className="input-message helper">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><g clip-path="url(#a)"><path stroke="#61A444" stroke-linecap="round" stroke-linejoin="round" d="m.571 9.771 3.12 4.012a1.144 1.144 0 0 0 1.783.034l9.954-12.046"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
              <span>{helperText}</span>
            </div>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
