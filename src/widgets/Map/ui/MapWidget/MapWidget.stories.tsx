import type { Meta, StoryObj } from "@storybook/react";
import { MapWidget } from "./MapWidget";

const meta = {
  title: 'Widgets/MapWidget',
  component: MapWidget,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof MapWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    apiKey: '28d11474-f6fe-4ffa-b5ea-4b0016185436'
  }
}