import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ModalAccessDenied } from './ModalAccessDenied';

const meta = { 
 title: 'features/ModalAccessDenied',
  component: ModalAccessDenied,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ModalAccessDenied>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story ={
  args: {
    isOpen: true,
    onClose: () => {},
  }
}