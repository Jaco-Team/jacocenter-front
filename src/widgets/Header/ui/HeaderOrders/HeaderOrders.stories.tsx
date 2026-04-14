import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
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
    cities:['Тольятти', 'Москва', 'Санкт-Петербург', 'Казань', 'Самара', 'Сочи', 'Тула'],
  }
}