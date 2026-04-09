import Image from 'next/image';
import { Column } from '@/shared/ui/Table/Table.types';
import { OrderHistoryRow } from './OrdersHistory.types';

export const ordersHistoryColumns: Column<OrderHistoryRow>[] = [
  { key: 'date', title: 'Дата', width: 128 },
  { key: 'orderNumber', title: '№ заказа', width: 128 },
  { key: 'status', title: 'Статус', width: 168 },
  {
    key: 'total',
    title: 'Сумма (₽)',
    width: 128,
    render: (value) => String(value),
  },
  {
    key: 'composition',
    title: 'Состав заказа',
    width: 128,
    render: (_, row) => (
      <div className="orders-history__icon">
        <Image src="/icons/script.svg" alt="Состав заказа" width={20} height={20} onClick={row.onShowComposition} />
      </div>
    ),
  },
  {
    key: 'repeat',
    title: 'Повторить',
    width: 128,
    render: (_, row) => (
      <div className={`orders-history__icon ${!row.canRepeat ? 'orders-history__icon--muted' : ''}`}>
        <Image src="/icons/repeat.svg" alt="Повторить заказ" width={20} height={20} onClick={row.canRepeat ? row.onRepeat : undefined} />
      </div>
    ),
  },
];