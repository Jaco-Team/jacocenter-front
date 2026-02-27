import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavPanel } from './NavPanel';

const meta: Meta<typeof NavPanel> = {
  title: 'Widgets/NavPanel',
  component: NavPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NavPanel>;

export const Default: Story = {
  render: () => {
    // отключила клики по иконкам, чтобы не было перехода на несуществующую страницу и storybook  не перезагружался
    const stopNavigation = (e: React.MouseEvent) => {
      e.preventDefault();
    };
    return (
      <div className='bg-bg-base' onClick={stopNavigation}>
        <NavPanel />
      </div>
  );
  }
};