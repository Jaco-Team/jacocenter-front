import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeaderOrders } from "./HeaderOrders";

const meta = {
  title: 'Widgets/HeaderOrders',
  component: HeaderOrders,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof HeaderOrders>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cities: [
      { id: 1, name: 'Тольятти' },
      { id: 2, name: 'Самара' },
    ],
  }
}