import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TableKitchen } from './TableKitchen';

const meta = {
  title: 'Widgets/TableKitchen',
  component: TableKitchen,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TableKitchen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
