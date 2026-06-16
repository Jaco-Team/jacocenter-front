export type TabVariant = 'default' | 'underline';

export interface TabProps {
  /** Текст таба */
  title: string;
  /** Активен ли таб */
  active: boolean;
  /** Обработчик клика */
  onClick: () => void;
  /** Вариант отображения */
  variant?: TabVariant;
  /** Дополнительные CSS-классы */
  className?: string;
}