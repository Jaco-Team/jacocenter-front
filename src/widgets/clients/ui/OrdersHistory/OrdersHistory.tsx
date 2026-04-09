import Image from "next/image";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Table } from "@/shared/ui/Table/Table";
import { Column } from "@/shared/ui/Table/Table.types";
import { OrdersHistoryProps, OrderHistoryRow } from "./OrdersHistory.types";
import "./OrdersHistory.styles.css";
import { ordersHistoryColumns } from "./OrdersHistory.columns";

export const OrdersHistory = ({
  isOpen,
  onClose,
  orders,
}: OrdersHistoryProps) => {
  return (
    <Modal title="История заказов" isOpen={isOpen} onClose={onClose}>
      <div className="orders-history__content">
        <span className="orders-history__subtitle">
          Последние 3 заказа можно повторить
        </span>
        <div className="orders-history__table-wrapper">
          <Table
            data={orders}
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
  );
};
