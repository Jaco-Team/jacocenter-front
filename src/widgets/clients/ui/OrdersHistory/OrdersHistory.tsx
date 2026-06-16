import Image from "next/image";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Table } from "@/shared/ui/Table/Table";
import { OrdersHistoryProps, OrderHistoryRow } from "./OrdersHistory.types";
import "./OrdersHistory.styles.css";
import { ordersHistoryColumns } from "./OrdersHistory.columns";
import { useState } from "react";
import { ModalOrderConfirm } from "@/features/order/ModalOrderConfirm/ModalOrderConfirm";
import { baseOrderDetails } from "../../data/mocks";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Typography/Typography";

export const OrdersHistory = ({
  isOpen,
  onClose,
  orders,
}: OrdersHistoryProps) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderHistoryRow | null>(null);

  const mappedOrders = orders.map((order) => ({
    ...order,
    onRepeat: order.canRepeat ? () => setSelectedOrder(order) : undefined,
    onShowComposition: () => setSelectedOrder(order),
  }));

  const renderOrderActions = () => {
    if (!selectedOrder) return null;
    
    return selectedOrder.canRepeat ? (
      <div className="flex flex-col gap-2 items-end ml-auto">
          <Button variant="base" theme="primary" size="md" onClick={() => console.log("Повторить заказ!")} className="!w-[176px]">
            <Text variant="body-m-medium-16">Повторить заказ</Text>
          </Button>
      </div>
    ) : (
      <div className="flex flex-col gap-2 items-end ml-auto">
        <Button variant="base" theme="primary" size="md" disabled className="!w-[176px]">
          <Text variant="body-m-medium-16">Повторить заказ</Text>
        </Button>
        <div className="flex gap-2 w-[242px]">
          <Image
            src="/icons/info-error.svg"
            alt="Ошибка"
            width={14}
            height={14}
          />
          <Text variant="label-s-regular-12">Функция неактивна. Повторить можно только последние 3 заказа.</Text>
        </div>
      </div>
    )
  }
  
  return (
    <>
      <Modal title="История заказов" isOpen={isOpen} onClose={onClose}>
        <div className="orders-history__content">
          <span className="orders-history__subtitle">
            Последние 3 заказа можно повторить
          </span>
          <div className="orders-history__table-wrapper">
            <Table
              data={mappedOrders}
              columns={ordersHistoryColumns}
              width={796}
              height={304}
              rowHeight={56}
              headerHeight={52}
              variant="secondary"
            />
          </div>
        </div>
      </Modal>
      <ModalOrderConfirm
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Заказ ${selectedOrder?.orderNumber}`}
        deliveryTime={baseOrderDetails.deliveryTime}
        clientPhone={baseOrderDetails.clientPhone}
        address={baseOrderDetails.address}
        intercom={baseOrderDetails.intercom}
        payment={baseOrderDetails.payment}
        promocode={baseOrderDetails.promocode}
        promocodeDescription={baseOrderDetails.promocodeDescription}
        comment={baseOrderDetails.comment}
        items={baseOrderDetails.items}
        totalPrice={baseOrderDetails.totalPrice}
        renderActions={renderOrderActions}
      />
    </>
  );
};
