"use client";

import { useState } from "react";
import "./Tab.styles.css";
import { TabProps } from "./Tab.types";

export const Tab = ({
  items,
  activeIndex: controlledActiveIndex,
  onChange,
  variant = "default",
  className = "",
}: TabProps) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);
  const activeIndex = controlledActiveIndex ?? internalActiveIndex;

  const handleClick = (index: number) => {
    if (controlledActiveIndex === undefined) {
      setInternalActiveIndex(index);
    }
    onChange?.(index);
  };

  const rootClasses = `tabs-root ${
    variant === "default" ? "tabs-default" : "tabs-underline"
  } ${className}`;

  return (
    <div className={rootClasses}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`tab-item ${index === activeIndex ? "active" : "inactive"}`}
          onClick={() => handleClick(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};