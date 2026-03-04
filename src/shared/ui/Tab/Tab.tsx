"use client";

import "./Tab.styles.css";
import { TabProps } from "./Tab.types";

export const Tab = ({
  title,
  active,
  onClick,
  variant = "default",
  className = "",
}: TabProps) => {
  const variantClass = variant === "default" ? "tab-default" : "tab-underline";
  const stateClass = active ? "active" : "inactive";

  return (
    <div
      className={`tab ${variantClass} ${stateClass} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      {title}
    </div>
  );
};