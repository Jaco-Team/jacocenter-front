export interface CategoryItem {
  id: string | number;
  name: string;
}

export interface CategoriesProps {
  /** Массив категорий */
  items: CategoryItem[];
  /** ID выбранной категории (для одиночного выбора) */
  selectedId?: string | number | null;
  /** Колбэк при выборе категории */
  onSelect?: (id: string | number) => void;
  /** Дополнительные CSS-классы */
  className?: string;
}