import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ModalFilters } from './ModalFilters';
import { useState } from 'react';

const columnsNames = [
  "Номер заказа",
  "Статус",
  "Тип",
  "Оформил",
  "Телефон клиента",
  "Адрес доставки",
  "Открыли заказ",
  "Ко времени",
  "Закрыли на кухне",
  "Получен клиентом",
  "До просрочки",
  "Обещали",
  "Сумма",
  "Оплата",
  "Водитель",
]

const meta = {
  title: 'features/orders/ModalFilters',
  component: ModalFilters,
} satisfies Meta<typeof ModalFilters>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    visibleColumns: Object.fromEntries(columnsNames.map((name) => [name, true])),
    onApply: () => {},
  },
  render: () => {
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
      Object.fromEntries(columnsNames.map((name) => [name, true]))
    )

    return (
      <>
      <button 
        popoverTarget="filters-modal" 
        style={{anchorName: '--filters-button'}} 
        className="w-[40px] h-[40px] bg-primary text-base block ml-auto mr-100" 
      >
        Клик
      </button>
        <ModalFilters visibleColumns={visibleColumns} onApply={setVisibleColumns} />
      </>
    )
  },
};

