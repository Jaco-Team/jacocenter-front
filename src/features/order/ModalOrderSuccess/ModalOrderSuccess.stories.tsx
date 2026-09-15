import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ModalOrderSuccess } from './ModalOrderSuccess';

const meta = { 
 title: 'Features/ModalOrderSuccess',
  component: ModalOrderSuccess,
  tags:['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ModalOrderSuccess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story ={
  args: {
    isOpen: true,
    onClose: () => {},
  }
}
