import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeaderKitchen } from './HeaderKitchen';

const meta = {
  title: 'Widgets/HeaderKitchen',
  component: HeaderKitchen,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeaderKitchen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};