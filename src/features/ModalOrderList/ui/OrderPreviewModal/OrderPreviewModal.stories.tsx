import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OrderPreviewModal } from './OrderPreviewModal';
import { useArgs } from 'storybook/preview-api';

const sampleItems = [
  { name: "Филадельфия Лайт", quantity: 1, price: 339 },
  { name: "Акваланг запечённый унаги", quantity: 1, price: 319 },
  { name: "Коралл запечённый унаги", quantity: 1, price: 229 },
  { name: "Коралл запечённый унаги", quantity: 1, price: 229 },
  { name: "Ролл Жако", quantity: 1, price: 0 },
  { name: "Васаби", quantity: 2, price: 18 },
  { name: "Вилка", quantity: 5, price: 0 },
  { name: "Палочки", quantity: 2, price: 0 },
];

const totalPrice = sampleItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

const orderNumber = 800602;

const meta = {
  title: 'features/OrderPreviewModal',
  component: OrderPreviewModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof OrderPreviewModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
render: (args) => {
    const [{ isOpen }, updateArgs] = useArgs();

    return (
      <>
        <button onClick={() => updateArgs({ isOpen: true })}
        className='mb-4 px-4 py-2 text-sm rounded-lg border border-gray-700 cursor-pointer bg-gray-100 hover:bg-gray-200'
          >
            Просмотр заказа 
          </button>

        <OrderPreviewModal
          {...args}
          isOpen={isOpen}
          onClose={() => updateArgs({ isOpen: false })}
        />
      </>
    );
  },
  args: { 
    items: sampleItems,
    totalPrice: totalPrice,
    orderNumber: orderNumber,
    isOpen: false,
    onClose: () => {}, 
  },
};