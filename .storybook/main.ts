import type { StorybookConfig } from '@storybook/nextjs-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],

  viteFinal: async config => {
    config.plugins?.unshift(
      svgr({
        svgrOptions: {
          icon: true,
          // Todo: Удалить заметку:
          // Это для того, чтобы если в svg прописаны свои цвета а не currentColor, то можно было бы его не вручную менять
          // а этой программой перезаписать. Но по хорошему бы все svg в исходниках менять на currentColor,
          // чтобы можно было управлять цветом.
          replaceAttrValues: {
            '#A6A6A6': 'currentColor',
            '#a6a6a6': 'currentColor',
          }, // replaces svg colors to currentColor. But its case sensitive!
        },
        include: '**/*.svg?react',
      }),
    );
    return config;
  },
};
export default config;
