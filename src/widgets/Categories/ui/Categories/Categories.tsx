"use client";

import { CategoryCard } from "@/shared/ui/CategoryCard/CategoryCard";
import "./Categories.styles.css";
import { CategoriesProps } from "./Categories.types";

export const Categories = ({
  items,
  selectedId,
  onSelect,
  className = "",
}: CategoriesProps) => {
  return (
    <div className={`categories-container ${className}`}>
      {items.map((item) => (
        <CategoryCard
          key={item.id}
          isSelected={item.id === selectedId}
          onClick={() => onSelect?.(item.id)}
        >
          {item.name}
        </CategoryCard>
      ))}
    </div>
  );
};