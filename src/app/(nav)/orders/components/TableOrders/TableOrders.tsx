'use client';
import { Table } from "@/shared/ui/Table/Table";
import { getOrdersColumns } from "./TableOrders.columns";
import { mockAllOrders } from "../../data/allOrders.mock";
import { useState } from "react";

export const TableOrders = () => {
  const [activeColumn, setActiveColumn] = useState<'status' | 'type' | 'createdBy' | null>(null);
  const columns = getOrdersColumns(activeColumn);

  return (
    <>
      <Table 
        data={mockAllOrders} 
        columns={columns}
        width={1088}
        height={564}
        rowHeight={52}
        rowGap={4}
        fontVariant="label-s-regular-12"
      />     
    </>
  );
}
