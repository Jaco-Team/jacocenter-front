import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ModalOrderDelete } from './ModalOrderDelete';
import { useArgs } from 'storybook/preview-api';

const meta = { 
 title: 'features/ModalOrderDelete',
  component: ModalOrderDelete,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ModalOrderDelete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [{ isOpen }, updateArgs] = useArgs();

    return (
      <>
        <button onClick={() => updateArgs({ isOpen: true })}
        className='mb-4 px-4 py-2 text-sm rounded-lg border border-gray-700 cursor-pointer bg-gray-100 hover:bg-gray-200'
          >
            Отменить заказ
          </button>

        <ModalOrderDelete
          isOpen={isOpen}
          onClose={() => updateArgs({ isOpen: false })}
          onCancelOrder={() => updateArgs({ isOpen: false })}
        />
      </>
    );
  },
  args: { 
    isOpen: false,
    onClose: () => {}, 
    onCancelOrder: () => {}, 
  },
};