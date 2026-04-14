'use client';
import { Table } from '@/shared/ui/Table/Table';
import { useState } from 'react';
import { getKitchenColumns } from './TableKitchen.columns';
import { orderStatus } from '@/widgets/orders/utils/constants';
import { useKitchenStore } from '@/entities/Order/store/kitchen/kitchenStore';
import { ColumnFilter } from '@/features/orders/ui/ColumnFilter/ColumnFilter';
import { mockKitchenOrders } from '../../data/kitchenOrders.mock';

export const TableKitchen = () => {
  const { foundRow, statusFilter, typeFilter, setStatusFilter, setTypeFilter } = useKitchenStore();
  const [activeColumn, setActiveColumn] = useState<'status' | 'type' | null>(null);

  const columns = getKitchenColumns(activeColumn);

  const filteredOrders = mockKitchenOrders.filter(order => 
    statusFilter[orderStatus[order.status]?.label] &&
    typeFilter[orderStatus[order.type]?.label]
  );

  return (
    <>
      <Table 
        data={filteredOrders} 
        columns={columns}
        height={616}
        rowHeight={48}
        headerHeight={60}
        fontVariant='label-s-regular-12'
        foundRow={foundRow}
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
    </>
  );
}