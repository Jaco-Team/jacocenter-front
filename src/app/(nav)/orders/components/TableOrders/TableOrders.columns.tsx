import { Column } from "@/shared/ui/Table/Table.types";
import { Order } from "./TableOrders.types";
import { Text } from "@/shared/ui/Typography/Typography";
import { StatusTag } from "@/widgets/orders/ui/StatusTag/StatusTag";
import { orderStatus } from "@/widgets/orders/utils/constants";

export const getOrdersColumns = (
  activeColumn: 'status' | 'type' | 'createdBy' | null,
): Column<Order>[] => [
  { key: 'orderNumber', title: 'Заказ', width: 62 },
  { 
    key: 'status', 
    title: 'Статус', 
    width: 100,
    isHeaderActive: activeColumn === 'status',
    headerRender: (col) => (
      <button
        type='button'
        popoverTarget='status-filters'
        style={{ anchorName: '--status-filters' }}
        className='w-full h-full flex items-center justify-center gap-3 bg-transparent border-none cursor-pointer p-0'
      >
        <Text variant={activeColumn === 'status' ? 'label-s-semibold-12' : 'label-s-regular-12'}>
          {col.title}
        </Text>
        <Arrow active={activeColumn === 'status'} />
      </button>
    ),
    render: (value) => <StatusTag status={value as keyof typeof orderStatus} />, 
  },
  { 
    key: 'type', 
    title: 'Тип', 
    width: 100,
    isHeaderActive: activeColumn === 'type',
    headerRender: (col) => (
      <button
        type='button'
        popoverTarget='type-filters'
        style={{ anchorName: '--type-filters' }}
        className='w-full h-full flex items-center justify-center gap-3 bg-transparent border-none cursor-pointer p-0'
      >
        <Text variant={activeColumn === 'type' ? 'label-s-semibold-12' : 'label-s-regular-12'}>
          {col.title}
        </Text>
        <Arrow active={activeColumn === 'type'} />
      </button>
    ),
    render: (value) => <StatusTag status={value as keyof typeof orderStatus} variant='orderType' />, 
  },
  { 
    key: 'createdBy', 
    title: 'Оформил', 
    width: 100,
    isHeaderActive: activeColumn === 'createdBy',
    headerRender: (col) => (
      <button
        type='button'
        popoverTarget='created-by-filters'
        style={{ anchorName: '--created-by-filters' }}
        className='w-full h-full flex items-center justify-center gap-3 bg-transparent border-none cursor-pointer p-0'
      >
        <Text variant={activeColumn === 'createdBy' ? 'label-s-semibold-12' : 'label-s-regular-12'}>
          {col.title}
        </Text>
        <Arrow active={activeColumn === 'createdBy'} />
      </button>
    ),
  },
  { key: 'phone', title: 'Телефон клиента', width: 120 },
  { key: 'address', title: 'Адрес доставки', width: 120 },
  { key: 'openedAt', title: 'Открыли\nзаказ', width: 100 },
  { key: 'dueTime', title: 'Ко времени', width: 100 },
  { key: 'closedAtKitchen', title: 'Закрыли\nна кухне', width: 100 },
  { key: 'receivedAt', title: 'Получен\nклиентом', width: 100 },
  { key: 'timeToOverdue', title: 'До просрочки', width: 100 },
  { key: 'promisedAt', title: 'Обещали', width: 100 },
  { key: 'amount', title: 'Сумма', width: 100 },
  { key: 'payment', title: 'Оплата', width: 100 },
  { key: 'driver', title: 'Водитель', width: 132 },
];

const Arrow = ({ active }: { active: boolean }) => (
  active 
    ? <div className='w-[10px] h-[10px] border-t-[1.5px] border-l-[1.5px] border-primary rotate-45 mt-1' />
    : <div className='w-[10px] h-[10px] border-b border-l border-text-secondary -rotate-45 mb-1' />
);