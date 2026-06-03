import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CafeCard } from "./CafeCard";

const meta = {
  title: "Features/CafeCard",
  component: CafeCard,
  args: {
    name: "Ворошилова 12А",
    zoneNumber: "1",
    deliveryPrice: 199,
    isSelected: false,
    onClick: () => {},
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CafeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};