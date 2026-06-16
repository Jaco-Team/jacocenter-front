import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CafeList } from "./CafeList";

const meta = {
  title: "Widgets/CafeList",
  component: CafeList,
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
};