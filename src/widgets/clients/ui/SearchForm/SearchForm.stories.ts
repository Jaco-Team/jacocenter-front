
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchForm } from './SearchForm';

const meta = {
  title: 'Widgets/Clients/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
