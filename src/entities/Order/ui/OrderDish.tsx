import type { OrderDishProps } from './OrderDish.types';
import XIcon from '@/../public/icons/x_circle.svg?react';
import MinusIcon from '@/../public/icons/minus.svg?react';
import PlusIcon from '@/../public/icons/plus.svg?react';
import { Text } from '@/shared/ui/Typography/Typography';

export function OrderDish({
  name,
  count,
  price,
  oldPrice,
  discountText,
  onIncrease,
  onDecrease,
  onDelete,
}: OrderDishProps) {
  
  const formatPrice = (value: number) => value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.');

  return (
    <article className="border-bg-base-light bg-base flex h-18 w-full items-center justify-between gap-2 border-b py-4">
      {/* Левый блок */}
      <div className="flex items-center gap-1">
        <button
          onClick={onDecrease}
          disabled={count <= 1}
          className="bg-base text-text-secondary disabled:text-disabled hover:border-bg-base active:bg-bg-base-light flex h-10 w-10 items-center justify-center rounded-lg border border-transparent transition disabled:hover:border-transparent"
        >
          <MinusIcon />
        </button>

        <div className="text-text-secondary text-center">{count}</div>

        <button
          onClick={onIncrease}
          className="bg-base text-text-secondary disabled:text-disabled hover:border-bg-base active:bg-bg-base-light flex h-10 w-10 items-center justify-center rounded-lg border border-transparent transition disabled:hover:border-transparent"
        >
          <PlusIcon />
        </button>
      </div>

      {/* Центральный блок*/}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Text className="text-text-secondary truncate">{name}</Text>
        {discountText && (
          <Text variant="label-s-regular-12" className="text-text-secondary pt-1">{discountText}</Text>
        )}
      </div>

      {/* Правый блок */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <Text className="text-text-secondary">
            {formatPrice(price)}
          </Text>

          {oldPrice && (
            <Text variant="label-s-regular-12" className="text-text-secondary line-through pt-1">
              {formatPrice(oldPrice)}
            </Text>
          )}
        </div>

        <button
          onClick={onDelete}
          className="bg-base text-text-secondary disabled:text-disabled hover:border-bg-base active:bg-bg-base-light flex h-10 w-10 items-center justify-center rounded-lg border border-transparent transition disabled:hover:border-transparent"
        >
          <XIcon />
        </button>
      </div>
    </article>
  );
}