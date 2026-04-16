'use client';
import { Table } from "@/shared/ui/Table/Table";
import { getOrdersColumns } from "./TableOrders.columns";
import { mockAllOrders } from "../../data/allOrders.mock";
import { useState } from "react";
import { useOrdersStore } from "@/entities/Order/store/orders/ordersStore";
import { ColumnFilter } from "@/features/orders/ui/ColumnFilter/ColumnFilter";
import { orderStatus } from "@/widgets/orders/utils/constants";

export const TableOrders = () => {
  const { selectedCafe, visibleColumns, statusFilter, typeFilter, createdByFilter, setStatusFilter, setTypeFilter, setCreatedByFilter } = useOrdersStore();
  const [activeColumn, setActiveColumn] = useState<'status' | 'type' | 'createdBy' | null>(null);
  const columns = getOrdersColumns(activeColumn)
    .filter(col => visibleColumns[col.title]);

  const filteredOrders = mockAllOrders.filter(order => 
    statusFilter[orderStatus[order.status]?.label] &&
    typeFilter[orderStatus[order.type]?.label] &&
    createdByFilter[order.createdBy] &&
    order.cafe === selectedCafe
  );

  return (
    <>
      <Table 
        data={filteredOrders} 
        columns={columns}
        height={564}
        rowHeight={52}
        rowGap={4}
        fontVariant="label-s-regular-12"
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
    </>
  );
}
