import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeaderNewOrder } from './HeaderNewOrder';

const meta = {
  title: 'Widgets/HeaderNewOrder',
  component: HeaderNewOrder,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeaderNewOrder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};