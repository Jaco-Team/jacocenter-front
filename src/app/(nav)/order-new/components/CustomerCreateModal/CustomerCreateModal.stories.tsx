import type { Meta, StoryObj } from '@storybook/react-vite';
import { CustomerCreateModal } from './CustomerCreateModal';

const meta = {
  title: 'OrderNew/CustomerCreateModal',
  component: CustomerCreateModal,
  parameters: { layout: 'centered' },
  args: {
    phone: '+7 (927) 123-45-67',
    cityId: 1,
    isOpen: true,
    onClose: () => undefined,
    onCreated: () => undefined,
  },
} satisfies Meta<typeof CustomerCreateModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  play: async ({ canvas }) => {
    const name = canvas.getByLabelText('Имя');
    await name.focus();
  },
};
