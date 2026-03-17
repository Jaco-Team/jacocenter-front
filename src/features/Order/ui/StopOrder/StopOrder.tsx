"use client";
import { useEffect, useRef } from "react";
import "./StopOrder.styles.css";
import { StopOrderProps } from "./StopOrder.types";

export const StopOrder = ({
  options,
  isActive = false,
  isOpen = false,
  onToggle,
  className = '',
}: StopOrderProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onToggle?.();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        if (isOpen) onToggle?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div ref={rootRef} className={`stop-order ${className}`}>
      <button
        type="button"
        className={`stop-order__trigger ${isActive ? 'stop-order__trigger--active' : ''} ${isActive && isOpen ? 'stop-order__trigger--open' : ''}`}
        onClick={isActive ? onToggle : undefined}
        aria-expanded={isOpen}
        disabled={!isActive}
      >
        <span>Есть кафе НА СТОПЕ</span>
        <span className={`stop-order__chevron ${isOpen ? 'stop-order__chevron--open' : ''}`} />
      </button>

      {isActive && isOpen && (
        <ul className="stop-order__dropdown">
          {options.map((option, index) => (
            <li key={index} className="stop-order__option">
              <span>{option.label}</span>
              {option.description && (
                <span className="stop-order__option-description">
                  {option.description}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

