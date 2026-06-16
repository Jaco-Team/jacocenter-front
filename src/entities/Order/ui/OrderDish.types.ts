export interface OrderDishProps {
  /** Название позиции */
  name: string;
  /** Текущее количество в корзине */
  count: number;
  /** Актуальная цена */
  price: number;
  /** Цена до скидки */
  oldPrice?: number;
  /** Текст бейджа скидки */
  discountText?: string;
  /** Функция прибавления кол-ва */
  onIncrease: () => void;
  /** Функция убавления кол-ва */
  onDecrease: () => void;
  /** Функция удаления позиции */
  onDelete: () => void;
}
