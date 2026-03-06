import { OrderDish } from '@/entities/Order/ui/OrderDish';
import { Button } from '@/shared/ui/Button/Button';
import { Text } from '@/shared/ui/Typography/Typography';
import { CartProps } from './Cart.types';

export function Cart({
  items,
  deliveryPrice = 0,
  onIncrease,
  onDecrease,
  onDelete,
  onNext,
  onOpenOrderInfo,
  onCancel,
  step
}: CartProps) {
  const sumWithoutDiscount = items.reduce((acc, item) => {
      const price = item.oldPrice ?? item.price;
      return acc + price * item.count;
    }, 0);

  const sumWithDiscount = items.reduce(
      (acc, item) => acc + item.price * item.count,
      0);

  const discountSum = sumWithoutDiscount - sumWithDiscount;

  const discountPercent = sumWithoutDiscount > 0 ? Math.round((discountSum / sumWithoutDiscount) * 100) : 0;

  const total = sumWithDiscount + deliveryPrice;

  const formatPrice = (value: number) => value.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(",", ".");

  return (
    <aside className="my-3 mr-4 min-w-[368px]">
      <section className="flex h-[640px] py-5 flex-col rounded-2xl bg-white text-text-secondary">
        
        <header className="px-3 mb-4 h-10 flex justify-between items-center">
          <button
            type="button"
            onClick={onOpenOrderInfo}
            className="cursor-pointer text-primary hover:text-button-primary-hover active:text-button-primary-pressed"
          >
            <Text className="underline underline-offset-[3px]">Весь заказ</Text>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer text-error hover:text-button-accent-hover active:text-button-accent-pressed"
          >
            <Text>Отменить заказ</Text>
          </button>
        </header>

        <ul className="flex-1 overflow-y-auto">
          {items.map(item => (
            <li key={item.id}>
              <OrderDish
                name={item.name}
                count={item.count}
                price={item.price * item.count}
                oldPrice={
                  item.oldPrice
                    ? item.oldPrice * item.count
                    : undefined
                }
                discountText={item.discountText}
                onIncrease={() => onIncrease(item.id)}
                onDecrease={() => onDecrease(item.id)}
                onDelete={() => onDelete(item.id)}
              />
            </li>
          ))}
        </ul>

        <footer className="border-t border-bg-base-light pt-5 px-3">
          <div className="flex flex-col gap-[9px]">
            <div className="flex justify-between">
              <Text variant="body-m-regular-16">Сумма</Text>
              <Text variant="body-m-regular-16">{formatPrice(sumWithoutDiscount)} ₽</Text>
            </div>

            {discountSum > 0 && (<div className="flex justify-between">
              <Text variant="label-s-regular-12">Скидка ({discountPercent}%)</Text>
              <Text variant="label-s-regular-12">{formatPrice(discountSum)} ₽</Text>
            </div>)}
          </div>

          {deliveryPrice > 0 && discountSum > 0 && (
            <div className="flex justify-between mt-3">
              <span>Со скидкой</span>
              <span>{formatPrice(sumWithDiscount)} ₽</span>
            </div>)}

            {deliveryPrice > 0 && (<div className="flex justify-between mt-3">
              <span>Доставка</span>
              <span>{formatPrice(deliveryPrice)} ₽</span>
            </div>
          )}

          <div className="flex justify-between text-text-base mt-10">
            <Text variant="body-l-regular-20">К оплате</Text>
            <Text variant="body-l-regular-20">{formatPrice(total)} ₽</Text>
          </div>
        </footer>
      </section>

      <Button
        variant="base"
        theme="primary"
        onClick={onNext}
        className="mt-3"
      >
        <Text variant="body-m-medium-16" className="text-bg-base-light">{step === 1 ? "Далее" : "Оформить заказ"}</Text>
      </Button>
    </aside>
  );
}