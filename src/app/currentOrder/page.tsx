"use client";
import { useState } from "react";
import { useOrderStore } from "@/entities/Order/store/new-order/orderStore";
import { ORDER_STEP } from "@/utils/constants";
import { Cart } from "@/widgets/Order/ui/Cart/Cart";
import { CardsDish } from "@/widgets/CardsDish/ui/CardsDish";
import { Categories } from "@/widgets/Categories/ui/Categories/Categories";
import { StopOrder } from "@/features/order/ui/StopOrder/StopOrder";
import { InputSearch } from "@/features/InputSearch/ui/InputSearch/InputSearch";
import { OrderPreviewModal } from "@/features/ModalOrderList/ui/OrderPreviewModal/OrderPreviewModal";
import { ModalOrderConfirm } from "@/features/order/ModalOrderConfirm/ModalOrderConfirm";
import { Tab } from "@/shared/ui/Tab/Tab";
import {
  mockCategories,
  mockDishes,
  mockStopOrders,
  mockCafeList,
} from "./mocks";
import { DeliveryForm } from "../(nav)/order-new/components/DeliveryForm/DeliveryForm";
import "./CurrentOrderPage.styles.css";
import { HeaderNewOrder } from "../(nav)/order-new/components/HeaderNewOrder/HeaderNewOrder";

export default function CurrentOrderPage() {
  const step = useOrderStore((s) => s.step);
  const setStep = useOrderStore((s) => s.setStep);
  const items = useOrderStore((s) => s.items);
  const addItem = useOrderStore((s) => s.addItem);
  const increaseItem = useOrderStore((s) => s.increaseItem);
  const decreaseItem = useOrderStore((s) => s.decreaseItem);
  const deleteItem = useOrderStore((s) => s.deleteItem);
  const phone = useOrderStore((s) => s.phone);
  const delivery = useOrderStore((s) => s.delivery);
  const payment = useOrderStore((s) => s.payment);
  const orderNumber = useOrderStore((s) => s.orderNumber);
  const resetOrder = useOrderStore((s) => s.resetOrder);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    string | number | null
  >(null);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    resetOrder();
  };

  const handleCancelConfirm = () => {
    setIsConfirmOpen(false);
    resetOrder();

  };

  const intercomLabel =
    delivery.intercom === "working"
      ? "работает"
      : delivery.intercom === "not-working"
        ? "не работает"
        : "—";

  const addressFull = [
    delivery.address,
    delivery.building && `корп. ${delivery.building}`,
    delivery.entrance && `подъезд ${delivery.entrance}`,
    delivery.floor && `эт. ${delivery.floor}`,
    delivery.apartment && `кв. ${delivery.apartment}`,
  ]
    .filter(Boolean)
    .join(", ");

  const paymentLabel =
    payment.method === "cash"
      ? `Наличный расчёт${payment.cashAmount ? `\nСдача с ${payment.cashAmount} рублей` : ""}`
      : payment.method === "card"
        ? "Безналичный расчёт"
        : "—";

  return (
    <div className="current-order">
      <main className="current-order__main">
        <HeaderNewOrder/>

        <div className="current-order__stop-order">
          <StopOrder options={mockStopOrders} />
        </div>

        <div className="current-order__tabs">
          <Tab
            title="Шаг 1. Заказ"
            active={step === ORDER_STEP.CART}
            variant="default"
            onClick={() => setStep(ORDER_STEP.CART)}
            className="current-order__tab"
          />
          <Tab
            title="Шаг 2. Способ получения"
            active={step === ORDER_STEP.DELIVERY}
            variant="default"
            onClick={() => setStep(ORDER_STEP.DELIVERY)}
            className="current-order__tab"
          />
        </div>

        <div className="current-order__content">
          {step === ORDER_STEP.CART && (
            <>
              <Categories
                items={mockCategories}
                selectedId={selectedCategory}
                onSelect={setSelectedCategory}
              />
              <div className="current-order__search">
                <InputSearch
                  options={mockDishes}
                  onSelect={(d) => addItem(d)}
                />
              </div>
              <CardsDish
                dishes={mockDishes.map((d) => ({
                  ...d,
                  onClick: () =>
                    addItem({ id: d.id, name: d.name, price: d.price }),
                }))}
              />
            </>
          )}

          {step === ORDER_STEP.DELIVERY && (
            <DeliveryForm
              cafeList={mockCafeList}
            />
          )}
        </div>
      </main>

      <Cart
        items={items}
        step={step}
        onOpenOrderInfo={() => setIsPreviewOpen(true)}
        onCancel={resetOrder}
        onIncrease={increaseItem}
        onDecrease={decreaseItem}
        onDelete={deleteItem}
        onNext={() => {
          if (step === ORDER_STEP.CART) {
            setStep(ORDER_STEP.DELIVERY);
            return;
          }
          setIsConfirmOpen(true);
        }}
      />

      <OrderPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        orderNumber={orderNumber ?? 0}
        items={items.map((i) => ({
          name: i.name,
          quantity: i.count,
          price: i.price,
        }))}
        totalPrice={totalPrice}
      />

      <ModalOrderConfirm
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onCancel={handleCancelConfirm}
        onEdit={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        title={`Заказ № ${orderNumber} от ${new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}`}
        deliveryTime="Время ожидания 0:45-1:15"
        clientPhone={phone}
        address={addressFull || "—"}
        intercom={intercomLabel}
        payment={paymentLabel}
        comment={payment.comment || undefined}
        items={items.map((i) => ({
          name: i.name,
          quantity: i.count,
          price: i.price,
        }))}
        totalPrice={totalPrice}
      />
    </div>
  );
}
