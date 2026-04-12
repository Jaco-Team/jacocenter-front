import { Table } from '@/shared/ui/Table/Table';
import { useState } from 'react';
import { getKitchenColumns } from './TableKitchen.columns';
import { mockKitchenOrders } from '../../data/kitchenOrders.mock';

export const TableKitchen = () => {
  const [activeColumn, setActiveColumn] = useState<'status' | 'type' | null>(null);
  const columns = getKitchenColumns(activeColumn, setActiveColumn);

  return (
    <Table 
      data={mockKitchenOrders} 
      columns={columns}
      width={1088}
      height={616}
      rowHeight={48}
      headerHeight={60}
      fontVariant='label-s-regular-12'
    />
  );
}
