export type TabVariant = 'default' | 'underline';

export interface TabProps {
  /** Массив названий табов (максимум 2, но компонент поддерживает любое количество) */
  items: string[];
  /** Индекс активного таба (если не передан, компонент управляет состоянием сам) */
  activeIndex?: number;
  /** Колбэк при смене таба */
  onChange?: (index: number) => void;
  /** Вариант отображения */
  variant?: TabVariant;
  /** Дополнительные CSS-классы */
  className?: string;
}