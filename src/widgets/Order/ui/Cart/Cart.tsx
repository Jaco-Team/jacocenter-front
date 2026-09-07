import { OrderDish } from '@/entities/Order/ui/OrderDish';
import { Button } from '@/shared/ui/Button/Button';
import { Text } from '@/shared/ui/Typography/Typography';
import { CartProps } from './Cart.types';
import { ORDER_STEP } from '@/utils/constants';
import { useState } from 'react';
import { ModalOrderDelete } from '@/features/order/ModalOrderDelete/ModalOrderDelete';
import { useOrderStore } from '@/entities/Order/store/new-order/orderStore';

export function Cart({
  items,
  deliveryPrice = 0,
  onIncrease,
  onDecrease,
  onDelete,
  onNext,
  onOpenOrderInfo,
  step
}: CartProps) {
  const { resetOrder } = useOrderStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    <aside className="flex-1 min-w-[320px] h-full flex flex-col">
      <section className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-2xl bg-white text-text-secondary">

        <header className="flex shrink-0">
          <Button
            variant="base"
            theme="primary"
            onClick={onOpenOrderInfo}
            className="h-12 flex-1 !rounded-none !rounded-tl-2xl"
          >
            <Text variant="body-m-medium-16" className="text-bg-base-light">Весь заказ</Text>
          </Button>

          <Button
            variant="base"
            theme="error"
            onClick={() => setIsDeleteModalOpen(true)}
            className="h-12 flex-1 !rounded-none !rounded-tr-2xl bg-error hover:bg-button-accent-hover active:bg-button-accent-pressed"
          >
            <Text variant="body-m-medium-16" className="text-bg-base-light">Отменить заказ</Text>
          </Button>
        </header>

        <ul className="flex-1 overflow-y-auto px-3">
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

        <footer className="border-t border-bg-base-light px-3 pt-5 pb-5">
          <div className="flex flex-col gap-[9px]">
            <div className="flex justify-between">
              <Text variant="body-m-regular-16">Сумма</Text>
              <Text variant="body-m-regular-16">{formatPrice(sumWithoutDiscount)} ₽</Text>
            </div>

            <div className="flex justify-between">
              <Text variant="label-s-regular-12">
                {discountSum > 0 ? `Скидка (${discountPercent}%)` : "Скидка"}
              </Text>
              <Text variant="label-s-regular-12">{formatPrice(discountSum)} ₽</Text>
            </div>
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
        className="mt-3 h-[44px] shtink-0"
      >
        <Text
          variant="body-m-medium-16" className="text-bg-base-light">{step === ORDER_STEP.CART ? "Далее" : "Оформить заказ"}</Text>
      </Button>

      <ModalOrderDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onCancelOrder={() => {
          setIsDeleteModalOpen(false);
          resetOrder();
        }}
      />
    </aside>
  );
}
