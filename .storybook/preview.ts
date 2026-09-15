import type { Preview } from '@storybook/nextjs-vite';
import { createElement } from 'react';
import { mswLoader } from 'msw-storybook-addon/csf3';
import { QueryProvider } from '../src/shared/api/QueryProvider';
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
        order: ['Shared UI', 'Entities', 'Features', 'Widgets', 'OrderNew', 'DeliveryMap', 'Orders', 'Kitchen'],
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
  decorators: [
    (Story) => (
      createElement(QueryProvider, null, createElement(Story))
    ),
  ],
  loaders: [mswLoader()],
};

export default preview;
