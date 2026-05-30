import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { CafeList } from "./CafeList";

const meta = {
  title: "Widgets/CafeList",
  component: CafeList,
  args: {
    selectedCafeId: null,
    onToggleCafe: () => {},
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CafeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div
        onClickCapture={(e) => {
          if ((e.target as HTMLElement).closest("a")) e.preventDefault();
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => {
    const [selectedCafeId, setSelectedCafeId] = useState<
      string | null
    >(null);
    return (
      <CafeList
        {...args}
        selectedCafeId={selectedCafeId}
        onToggleCafe={setSelectedCafeId}
      />
    );
  },
};