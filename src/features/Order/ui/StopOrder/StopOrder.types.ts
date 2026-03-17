export interface StopOrderOption {
  /** Название кафе/зоны */
  label: string;
  /** Доп. информация (например, время) */
  description?: string;
}

export interface StopOrderProps {
  options: StopOrderOption[];
  /** Есть ли кафе на стопе (красный режим) */
  isActive?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}