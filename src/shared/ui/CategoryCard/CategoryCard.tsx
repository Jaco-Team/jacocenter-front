"use client";

import { Text } from "../Typography/Typography";
import "./CategoryCard.styles.css";
import { CategoryCardProps } from "./CategoryCard.types";

export const CategoryCard = ({
  children,
  isSelected = false,
  accent = false,
  onClick,
  className = "",
}: CategoryCardProps) => {
  return (
    <div
      className={`category-card ${isSelected ? "selected" : ""} ${accent ? "accent" : ""} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
    >
      <Text
        variant={accent ? "body-m-medium-16" : "body-m-regular-16"}
        className={accent ? "category-card__accent-text" : undefined}
      >
        {children}
      </Text>
    </div>
  );
};
