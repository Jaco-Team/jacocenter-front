import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavPanel } from './NavPanel';
import { navPanelMock } from '../utils/mock';

const routes = navPanelMock.map(item => item.href);

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
};

export default meta;

type Story = StoryObj<NavPanelStoryArgs>;

export const Default: Story = {
  args: {
    pathname: '/clients',
  },
  decorators: [
    (Story, context) => {
      context.parameters.nextjs = {
        appDirectory: true,
        navigation: {
          pathname: context.args.pathname,
        },
      };

      return <Story key={context.args.pathname} />;
    },
  ],
  render: () => (
    <div className="bg-bg-base">
      <NavPanel />
    </div>
  ),
};