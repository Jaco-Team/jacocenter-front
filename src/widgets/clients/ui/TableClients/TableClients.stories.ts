import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TableClients } from './TableClients';

const meta = {
  title: 'widgets/TableClients',
  component: TableClients,
  parameters: {
    layout: 'centered',
  },
  args: {
    searchPhone: '+7 999 000 00-05',
  }
} satisfies Meta<typeof TableClients>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
