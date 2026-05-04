import type { Meta, StoryObj } from "@storybook/react-vite";
import { DeliveryForm } from "./DeliveryForm";

const meta: Meta<typeof DeliveryForm> = {
  title: "Order-new/DeliveryForm",
  component: DeliveryForm,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DeliveryForm>;

const cafeList = [
  { id: 1, name: "Ленинградская 47" },
  { id: 2, name: "Ворошилова 12 а" },
  { id: 3, name: "Матросова 32" },
  { id: 4, name: "Цветной 1" },
  { id: 5, name: "Ленинградская 100" },
  { id: 6, name: "Ленинский проспект 5" },
];

export const Default: Story = {
  render: () => (
    <div style={{ width: 900, padding: 20 }}>
      <DeliveryForm cafeList={cafeList}/>
    </div>
  ),
};