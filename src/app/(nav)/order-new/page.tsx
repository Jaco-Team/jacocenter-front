"use client";
import { useState } from "react";
import { useOrderStore } from "@/entities/Order/store/new-order/orderStore";
import { ORDER_STEP } from "@/utils/constants";
import { Cart } from "@/widgets/Order/ui/Cart/Cart";
import { StopOrder } from "@/features/order/ui/StopOrder/StopOrder";
import { OrderPreviewModal } from "@/features/ModalOrderList/ui/OrderPreviewModal/OrderPreviewModal";
import { ModalOrderConfirm } from "@/features/order/ModalOrderConfirm/ModalOrderConfirm";
import { Tab } from "@/shared/ui/Tab/Tab";
import { mockStopOrders } from "./data/mocks";
import { DeliveryForm } from "./components/DeliveryForm/DeliveryForm";
import "./CurrentOrderPage.styles.css";
import { HeaderNewOrder } from "./components/HeaderNewOrder/HeaderNewOrder";
import { OrderCatalogStep } from "./components/OrderCatalogStep/OrderCatalogStep";

export default function CurrentOrderPage() {
  const step = useOrderStore((s) => s.step);
  const setStep = useOrderStore((s) => s.setStep);
  const items = useOrderStore((s) => s.items);
  const increaseItem = useOrderStore((s) => s.increaseItem);
  const decreaseItem = useOrderStore((s) => s.decreaseItem);
  const deleteItem = useOrderStore((s) => s.deleteItem);
  const phone = useOrderStore((s) => s.phone);
  const delivery = useOrderStore((s) => s.delivery);
  const payment = useOrderStore((s) => s.payment);
  const orderNumber = useOrderStore((s) => s.orderNumber);
  const resetOrder = useOrderStore((s) => s.resetOrder);
  const deliveryType = useOrderStore((s) => s.deliveryType);
  const promocode = useOrderStore((s) => s.promocode);
  const pickup = useOrderStore((s) => s.pickup);
  const time = useOrderStore((s) => s.time);
  const timeMode = useOrderStore((s) => s.timeMode);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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

  const addressFull = deliveryType === "pickup" ? pickup.cafe : [
    delivery.address,
    delivery.building && `корп. ${delivery.building}`,
    delivery.entrance && `п. ${delivery.entrance}`,
    delivery.floor && `эт. ${delivery.floor}`,
    delivery.apartment && `кв. ${delivery.apartment}`,
  ]
    .filter(Boolean)
    .join(", ");

  const paymentLabel =
    payment.method === "cash"
      ? `Наличный расчёт${payment.cashAmount ? `\nСдача с ${payment.cashAmount} рублей` : ""}`
      : payment.method === "card"
        ? "Безналичный расчёт" : "—";

  const nearestLabel = deliveryType === "delivery" ? "Время ожидания" : "Время приготовления";
  const scheduledLabel = deliveryType === "delivery" ? "Доставим" : "Заберут";
  const nearestTime = deliveryType === "delivery" ? "1:25 - 1:55" : "0:10 - 0:15";
  const deliveryTime = timeMode === "by-time" ? `${scheduledLabel} ${time.date}, ${time.time}` : `${nearestLabel} ${nearestTime}`;

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
          {step === ORDER_STEP.CART && <OrderCatalogStep/>}
          {step === ORDER_STEP.DELIVERY && <DeliveryForm/>}
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
        deliveryType={deliveryType}
        deliveryTime={deliveryTime}
        clientPhone={`+7 (${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6,8)}-${phone.slice(8,10)}`}
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
        promocode={promocode || undefined}
      />
    </div>
  );
}
