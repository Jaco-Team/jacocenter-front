'use client';
import { Table } from "@/shared/ui/Table/Table";
import { getOrdersColumns } from "./TableOrders.columns";
import { mockAllOrders } from "../../data/allOrders.mock";
import { useState } from "react";
import { useOrdersStore } from "@/entities/Order/store/orders/ordersStore";
import { ColumnFilter } from "@/features/orders/ui/ColumnFilter/ColumnFilter";
import { orderStatus } from "@/widgets/orders/utils/constants";
import { Order } from "./TableOrders.types";
import { ModalOrderConfirm } from "@/features/order/ModalOrderConfirm/ModalOrderConfirm";
import { baseOrderDetails, sampleDecomposition } from "@/widgets/clients/data/mocks";
import { Button } from "@/shared/ui/Button/Button";
import { Text } from "@/shared/ui/Typography/Typography";
import "./TableOrders.style.css";
import Image from "next/image";

export const TableOrders = () => {
  const { selectedCafe, visibleColumns, statusFilter, typeFilter, createdByFilter, setStatusFilter, setTypeFilter, setCreatedByFilter } = useOrdersStore();
  const [activeColumn, setActiveColumn] = useState<'status' | 'type' | 'createdBy' | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const columns = getOrdersColumns(activeColumn)
    .filter(col => visibleColumns[col.title]);

  const filteredOrders = mockAllOrders.filter(order => 
    statusFilter[orderStatus[order.status]?.label] &&
    typeFilter[orderStatus[order.type]?.label] &&
    createdByFilter[order.createdBy] &&
    order.cafe === selectedCafe
  );

  const renderOrderActions = () => {
    if (!selectedOrder) return null;
    
    return (
      <div className="order-breakdown-group">
        <details className="group">
          <summary className="order-breakdown-summary">
            <Text>Расформировка</Text>
            <Image src="/icons/arrow-down.svg" alt="Стрелка" width={15} height={15} className="group-open:rotate-180"/>
          </summary>
          <ul className="order-breakdown-items-list">
            {sampleDecomposition.map((item, index) => (
              <li key={index} className="order-breakdown-item">
                <Text>{item.name}</Text>
                <Text className={
                  item.status === "Приготовлен" ? "text-primary" : 
                  item.status === "В очереди" ? "text-text-subtle" : "" }>{item.status}</Text>
              </li>
            ))}
          </ul>
        </details>
        <Button variant="base" theme="error" size="md" onClick={() => console.log("отменить")} className="order-breakdown-cancel-button">
          <Text variant="body-m-medium-16">Отменить заказ</Text>
        </Button>
      </div>
    ) 
  }

  return (
    <>
      <Table 
        data={filteredOrders} 
        columns={columns}
        height={564}
        rowHeight={52}
        rowGap={4}
        fontVariant="label-s-regular-12"
        onRowClick={(order) => setSelectedOrder(order)}
      />  
      <ColumnFilter 
        options={statusFilter}
        onChange={setStatusFilter}
        allLabel='Все статусы'
        id='status-filters'
        onToggle={(open) => setActiveColumn(open ? 'status' : null)}
      />
      <ColumnFilter 
        options={typeFilter}
        onChange={setTypeFilter}
        allLabel='Все типы'
        id='type-filters'
        onToggle={(open) => setActiveColumn(open ? 'type' : null)}
      />   
      <ColumnFilter 
        options={createdByFilter}
        onChange={setCreatedByFilter}
        id='created-by-filters'
        onToggle={(open) => setActiveColumn(open ? 'createdBy' : null)}
      />   
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
}
