import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PromocodeList } from './PromocodeList';

const meta = {
  title: 'widgets/PromocodeList',
  component: PromocodeList,
  parameters: {
    layout: 'centered',
  },
  args:{
    isOpen: true,
    onClose: ()=>{}
  }
} satisfies Meta<typeof PromocodeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};