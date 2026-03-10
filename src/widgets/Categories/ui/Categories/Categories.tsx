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
    <ul className={`categories-container ${className}`}>
      {items.map((item) => (
        <li key={item.id} className="categories-item">
          <CategoryCard
            key={item.id}
            isSelected={item.id === selectedId}
            onClick={() => onSelect?.(item.id)}
          >
            {item.name}
          </CategoryCard>
        </li>
      ))}
    </ul>
  );
};
