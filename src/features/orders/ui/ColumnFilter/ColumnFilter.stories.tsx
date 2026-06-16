import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ColumnFilter } from './ColumnFilter';
import { useState } from 'react';
import { ColumnFilterProps } from './ColumnFilter.types';

const statusOptions = ['В очереди', 'Готовится', 'В пути', 'Готов', 'Отмена'];
const typeOptions = ['Доставка', 'Самовывоз', 'Зал'];
const sourceOptions = ['Клиент', 'Кухня'];

const meta = {
  title: 'features/orders/ColumnFilter',
  component: ColumnFilter,
  render: (args) => {
    const [options, setOptions] = useState(args.options);

    return (
      <>
        <button
          popoverTarget={args.id}
          style={{ anchorName: `--${args.id}` }}
          className='w-[100px] h-[52px] bg-primary-light text-text-base block mx-auto cursor-pointer'
        >
          {args.buttonLabel}
        </button>
        <ColumnFilter {...args} options={options} onChange={setOptions} />
      </>
    );
  },
}  satisfies Meta<ColumnFilterProps & { buttonLabel: string }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilterStatus: Story = {
  args: {
    buttonLabel: 'Статус',
    id: 'status-filters',
    options: Object.fromEntries(statusOptions.map((name) => [name, false])),
    onChange: () => {},
    allLabel: 'Все статусы',
  },
};

export const FilterType: Story = {
  args: {
    buttonLabel: 'Тип',
    id: 'type-filters',
    options: Object.fromEntries(typeOptions.map((name) => [name, false])),
    onChange: () => {},
    allLabel: 'Все типы',
  },
};

export const FilterSource: Story = {
  args: {
    buttonLabel: 'Оформил',
    id: 'source-filters',
    options: Object.fromEntries(sourceOptions.map((name) => [name, false])),
    onChange: () => {},
  },
};
