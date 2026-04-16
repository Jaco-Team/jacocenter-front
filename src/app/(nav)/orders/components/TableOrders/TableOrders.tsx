'use client';
import { Table } from "@/shared/ui/Table/Table";
import { getOrdersColumns } from "./TableOrders.columns";
import { mockAllOrders } from "../../data/allOrders.mock";
import { useState } from "react";
import { useOrdersStore } from "@/entities/Order/store/orders/ordersStore";

export const TableOrders = () => {
  const { visibleColumns } = useOrdersStore();
  const [activeColumn, setActiveColumn] = useState<'status' | 'type' | 'createdBy' | null>(null);
  
  const columns = getOrdersColumns(activeColumn)
    .filter(col => visibleColumns[col.title]);

  return (
    <>
      <Table 
        data={mockAllOrders} 
        columns={columns}
        height={564}
        rowHeight={52}
        rowGap={4}
        fontVariant="label-s-regular-12"
      />     
    </>
  );
}
