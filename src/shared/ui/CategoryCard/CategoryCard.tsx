"use client";

import { Text } from "../Typography/Typography";
import "./CategoryCard.styles.css";
import { CategoryCardProps } from "./CategoryCard.types";

export const CategoryCard = ({
  children,
  isSelected = false,
  onClick,
  className = "",
}: CategoryCardProps) => {
  return (
    <div
      className={`category-card ${isSelected ? "selected" : ""} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      <Text>{children}</Text>
    </div>
  );
};