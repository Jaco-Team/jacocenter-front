import Image from "next/image";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Table } from "@/shared/ui/Table/Table";
import { Column } from "@/shared/ui/Table/Table.types";
import { OrdersHistoryProps, OrderHistoryRow } from "./OrdersHistory.types";
import "./OrdersHistory.styles.css";

export const OrdersHistory = ({
  isOpen,
  onClose,
  orders,
}: OrdersHistoryProps) => {
  const columns: Column<OrderHistoryRow>[] = [
    {
      key: "date",
      title: "Дата",
      width: 128,
    },
    {
      key: "orderNumber",
      title: "№ заказа",
      width: 128,
    },
    {
      key: "status",
      title: "Статус",
      width: 168,
    },
    {
      key: "total",
      title: "Сумма (₽)",
      width: 128,
      render: (value) => String(value),
    },
    {
      key: "composition",
      title: "Состав заказа",
      width: 128,
      render: (_, row) => (
        <div className="orders-history__icon">
          <Image
            src="/icons/script.svg"
            alt="Состав заказа"
            width={20}
            height={20}
            onClick={row.onShowComposition}
          />
        </div>
      ),
    },
    {
      key: "repeat",
      title: "Повторить",
      width: 128,
      render: (_, row) => (
        <div
          className={`orders-history__icon ${!row.canRepeat ? "orders-history__icon--muted" : ""}`}
        >
          <Image
            src="/icons/repeat.svg"
            alt="Повторить заказ"
            width={20}
            height={20}
            onClick={row.canRepeat ? row.onRepeat : undefined}
          />
        </div>
      ),
    },
  ];

  return (
    <Modal title="История заказов" isOpen={isOpen} onClose={onClose}>
      <div className="orders-history__content">
        <span className="orders-history__subtitle">
          Последние 3 заказа можно повторить
        </span>
        <div className="orders-history__table-wrapper">
          <Table
            data={orders}
            columns={columns}
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
