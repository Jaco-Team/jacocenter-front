import { Column } from '@/shared/ui/Table/Table.types';
import { KitchenOrder } from './TableKitchen.types';
import { Text } from '@/shared/ui/Typography/Typography';
import { StatusTag } from '@/widgets/orders/ui/StatusTag/StatusTag';
import { orderStatus } from '@/widgets/orders/utils/constants';

export const getKitchenColumns = (
  activeColumn: 'status' | 'type' | null,
): Column<KitchenOrder>[] => [
    { key: 'number', title: '№', width: 64 },
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
    { key: 'orderedAt', title: 'Время\nзаказа/предзаказа', width: 128 },
    { key: 'readyAt', title: 'Время\nвыхода на стол', width: 128 },
    { key: 'assembledAt', title: 'Во сколько\nсобрали', width: 128 },
    { key: 'closedAt', title: 'Закрыли', width: 100 },
    { key: 'preparedAt', title: 'Приготовили', width: 100 },
    { key: 'servedAt', title: 'Отдали', width: 100 },
    { key: 'promisedIn', title: 'Обещали', width: 140 },
  ];

const Arrow = ({ active }: { active: boolean }) => (
  active 
    ? <div className='w-[10px] h-[10px] border-t-[1.5px] border-l-[1.5px] border-primary rotate-45 mt-1' />
    : <div className='w-[10px] h-[10px] border-b border-l border-text-secondary -rotate-45 mb-1' />
);