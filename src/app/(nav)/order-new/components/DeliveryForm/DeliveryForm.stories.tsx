import type { Meta, StoryObj } from "@storybook/react-vite";
import { DeliveryForm } from "./DeliveryForm";

const meta: Meta<typeof DeliveryForm> = {
  title: "OrderNew/DeliveryForm",
  component: DeliveryForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DeliveryForm>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 900, padding: 20 }}>
      <DeliveryForm/>
    </div>
  ),
};
