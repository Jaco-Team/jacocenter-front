import type { Preview } from '@storybook/nextjs-vite';
import { mswLoader } from 'msw-storybook-addon/csf3';
import '../src/app/globals.css';
import { handlers } from './handlers';

const preview: Preview = {
  parameters: {
    msw: handlers,
    nextjs: {
      appDirectory: true,
    },
    options: {
      storySort: {
        order: ['Shared UI', 'Entities', 'Features', 'Widgets', 'OrderNew', 'DeliveryMap', 'Orders', 'Kitchen', 'Example'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  loaders: [mswLoader()],
};

export default preview;
