export interface CategoryCardProps {
  /** Содержимое карточки (текст или другие элементы) */
  children: React.ReactNode;
  /** Выбрана ли карточка */
  isSelected?: boolean;
  /** Обработчик клика */
  onClick?: () => void;
  /** Дополнительные CSS-классы */
  className?: string;
}