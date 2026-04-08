"use client";
import { useState } from "react";
import { useOrderStore } from "@/store/orderStore";
import { ORDER_STEP } from "@/utils/constants";
import { NavPanel } from "@/widgets/NavPanel/ui/NavPanel";
import { Cart } from "@/widgets/Order/ui/Cart/Cart";
import { CardsDish } from "@/widgets/CardsDish/ui/CardsDish";
import { Categories } from "@/widgets/Categories/ui/Categories/Categories";
import { StopOrder } from "@/features/order/ui/StopOrder/StopOrder";
import { InputPhone } from "@/features/Inputs/ui/InputPhone/InputPhone";
import { InputSearch } from "@/features/InputSearch/ui/InputSearch/InputSearch";
import { OrderPreviewModal } from "@/features/ModalOrderList/ui/OrderPreviewModal/OrderPreviewModal";
import { ModalOrderConfirm } from "@/features/order/ModalOrderConfirm/ModalOrderConfirm";
import { Tab } from "@/shared/ui/Tab/Tab";
import { Tooltip } from "@/shared/ui/Tooltip/Tooltip";
import { Button } from "@/shared/ui/Button/Button";
import {
  mockCategories,
  mockDishes,
  mockStopOrders,
  mockCafeList,
  mockCities,
} from "./mocks";
import { DeliveryForm } from "../(nav)/order-new/components/DeliveryForm/DeliveryForm";

export default function CurrentOrderPage() {
  const {
    step,
    setStep,
    items,
    addItem,
    increaseItem,
    decreaseItem,
    deleteItem,
    clearCart,
    phone,
    setPhone,
    promocode,
    setPromocode,
    delivery,
    setDelivery,
    pickup,
    setPickup,
    payment,
    setPayment,
    time,
    setTime,
  } = useOrderStore();

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    string | number | null
  >(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    string | number | null
  >(null);
  const [orderNumber] = useState(800602);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  const deliveryState = {
    ...delivery,
    setAddress: (val: string) => setDelivery({ address: val }),
    setBuilding: (val: string) => setDelivery({ building: val }),
    setEntrance: (val: string) => setDelivery({ entrance: val }),
    setFloor: (val: string) => setDelivery({ floor: val }),
    setApartment: (val: string) => setDelivery({ apartment: val }),
    setIntercom: (val: "working" | "not-working") =>
      setDelivery({ intercom: val }),
    setAddressCheckStatus: (val: null | "success" | "error") =>
      setDelivery({ addressCheckStatus: val }),
  };

  const pickupState = {
    ...pickup,
    setCafe: (val: string) => setPickup({ cafe: val }),
    setCafeCheckStatus: (val: null | "success" | "error") =>
      setPickup({ cafeCheckStatus: val }),
  };

  const paymentState = {
    ...payment,
    setMethod: (val: "cash" | "card") => setPayment({ method: val }),
    setCashAmount: (val: string) => setPayment({ cashAmount: val }),
    setComment: (val: string) => setPayment({ comment: val }),
  };

  const timeState = {
    ...time,
    setDate: (val: string) => setTime({ date: val }),
    setTime: (val: string) => setTime({ time: val }),
    setIsTimeSaved: (val: boolean) => setTime({ isTimeSaved: val }),
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    clearCart();
    setStep(ORDER_STEP.CART);
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
    <div className="flex h-screen">
      <NavPanel />

      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Шапка */}
        <div className="flex items-center gap-3 px-3 pt-3">
          {/* Город */}
          <div className="w-[160px] flex-shrink-0">
            <InputSearch options={mockCities} />
          </div>

          {/* Телефон */}
          <div className="w-[200px] flex-shrink-0">
            <InputPhone
              value={phone}
              onChange={(val) => setPhone(val)}
              placeholder="+7 999 999-99-99"
            />
          </div>

          {/* Промокод + тултип */}
          <div className="flex items-center gap-1 flex-1">
            <div className="flex-1">
              <InputSearch options={[]} />
            </div>
            <Tooltip
              content="Введите промокод для получения скидки"
              placement="bottom"
            >
              <button className="w-8 h-8 flex items-center justify-center text-text-muted rounded-full border border-text-muted text-sm">
                ?
              </button>
            </Tooltip>
          </div>

          {/* Кнопка Найти */}
          <Button variant="base" theme="primary" size="sm" onClick={() => {}}>
            Найти
          </Button>
        </div>

        {/* Кафе на стопе */}
        <div className="px-3 pt-3 pb-4">
          <StopOrder options={mockStopOrders} />
        </div>

        {/* Табы шагов */}
        <div className="flex px-3">
          <Tab
            title="Шаг 1. Заказ"
            active={step === ORDER_STEP.CART}
            variant="default"
            onClick={() => setStep(ORDER_STEP.CART)}
            className="flex-1"
          />
          <Tab
            title="Шаг 2. Способ получения"
            active={step === ORDER_STEP.DELIVERY}
            variant="default"
            onClick={() => setStep(ORDER_STEP.DELIVERY)}
            className="flex-1"
          />
        </div>

        {/* Контент */}
        <div className="flex-1 overflow-y-auto px-3 pt-3">
          {step === ORDER_STEP.CART && (
            <>
              {/* Категории */}
              <Categories
                items={mockCategories}
                selectedId={selectedCategory}
                onSelect={setSelectedCategory}
              />

              {/* Поиск товаров */}
              <div className="my-3 relative">
                <InputSearch
                  options={mockDishes.map((d) => ({
                    id: Number(d.id),
                    name: d.name,
                  }))}
                />
              </div>

              {/* Карточки блюд */}
              <CardsDish
                dishes={mockDishes.map((d) => ({
                  ...d,
                  onClick: () =>
                    addItem({
                      id: d.id,
                      name: d.name,
                      price: d.price,
                    }),
                }))}
              />
            </>
          )}

          {step === ORDER_STEP.DELIVERY && (
            <DeliveryForm
              deliveryState={deliveryState}
              pickupState={pickupState}
              timeState={timeState}
              paymentState={paymentState}
              cafeList={mockCafeList}
            />
          )}
        </div>
      </main>

      {/* Корзина */}
      <Cart
        items={items}
        step={step}
        onOpenOrderInfo={() => setIsPreviewOpen(true)}
        onCancel={() => {
          clearCart();
          setStep(ORDER_STEP.CART);
        }}
        onIncrease={increaseItem}
        onDecrease={decreaseItem}
        onDelete={deleteItem}
        onNext={() => {
          if (step === ORDER_STEP.CART) setStep(ORDER_STEP.DELIVERY);
          else setIsConfirmOpen(true);
        }}
      />

      {/* Модалка предпросмотра */}
      <OrderPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        orderNumber={orderNumber}
        items={items.map((i) => ({
          name: i.name,
          quantity: i.count,
          price: i.price,
        }))}
        totalPrice={totalPrice}
      />

      {/* Модалка подтверждения */}
      <ModalOrderConfirm
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onCancel={() => {
          setIsConfirmOpen(false);
          clearCart();
          setStep(ORDER_STEP.CART);
        }}
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
