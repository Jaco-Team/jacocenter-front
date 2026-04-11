import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CafeFilterTab } from './CafeFilterTab';
import { useArgs } from 'storybook/internal/preview-api';

const meta = {
  title: 'features/orders/CafeFilterTab',
  component: CafeFilterTab,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CafeFilterTab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cafe: 'Ленинградская 47',
    isActive: false,
    onSelect: () => {},
  },
  render: (args) => {
    const [{ isActive }, updateArgs] = useArgs();

    return (
      <CafeFilterTab
        {...args}
        isActive={isActive}
        onSelect={() => {
          updateArgs({ isActive: !isActive });
        }}
      />
    );
  },
};

