import type { Meta, StoryObj } from "@storybook/react";
import { OrderList } from "./OrderList";

const meta = {
  title: "Widgets/OrderList",
  component: OrderList,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
  (Story) => (
    <div style={{ width: 484 }}>
      <Story />
    </div>
  ),
],
  argTypes: {
    variant: {
      control: "radio",
      options: ["narrow", "wide"],
    },
  },
} satisfies Meta<typeof OrderList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { name: "Ролл «Филадельфия»", quantity: 2, price: 600 },
  { name: "Сет «Токио»", quantity: 1, price: 1200 },
  { name: "Гюдон", quantity: 3, price: 900 },
  { name: "Спайс суп", quantity: 1, price: 350 },
];

export const Narrow: Story = {
  args: {
    items: sampleItems,
    totalPrice: 3050,
    variant: "narrow",
  },
};

export const Wide: Story = {
  args: {
    items: sampleItems,
    totalPrice: 3050,
    variant: "wide",
  },
};

export const Empty: Story = {
  args: {
    items: [],
    totalPrice: 0,
    variant: "narrow",
  },
};