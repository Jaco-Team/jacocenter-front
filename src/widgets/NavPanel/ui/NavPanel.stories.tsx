import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { NavPanel } from './NavPanel';
import { navItems } from '../model/navItems';

import { useSessionStore } from '@/entities/auth/store/sessionStore/sessionStore';

const routes = [...navItems.map(item => item.href), '/lk'];

type NavPanelStoryArgs = React.ComponentProps<typeof NavPanel> & {
  pathname: string;
};

const meta: Meta<NavPanelStoryArgs> = {
  title: 'Widgets/NavPanel',
  component: NavPanel,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    pathname: {
      control: { type: 'select' },
      options: routes,
      description: 'Текущий URL',
    },
  },
  loaders: [
    () => {
      useSessionStore.setState({
        user: {
          id: 12,
          login: 'operator',
          name: 'Иван',
          fullName: 'Иван Иванов',
          shortName: 'Иван',
        },
        status: 'ready',
      });
    },
  ],
};

export default meta;

type Story = StoryObj<NavPanelStoryArgs>;

export const Default: Story = {
  args: {
    pathname: '/clients',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/clients',
      },
    },
  },
  render: () => (
    <div className="bg-bg-base">
      <NavPanel />
    </div>
  ),
};
export const PersonalAccountActive: Story = {
  args: { pathname: '/lk' },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/lk',
      },
    },
  },
  render: () => (
    <div className="bg-bg-base">
      <NavPanel />
    </div>
  ),
};

export const Collapsed: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Свернуть меню' }));
    await expect(canvas.getByRole('button', { name: 'Развернуть меню' })).toBeInTheDocument();
  },
};
