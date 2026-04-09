import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FiltersBlock } from './FiltersBlock';

const cafeList = [
    "Ленинградская 47",
    "Ворошилова 12А",
    "Матросова 32",
    "Цветной 1"
  ];

const meta = {
  title: 'features/orders/FiltersBlock',
  component: FiltersBlock,
  args: {
    cafeList: cafeList
  },
} satisfies Meta<typeof FiltersBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

