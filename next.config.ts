import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', 
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // eslint-disable-next-line
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Convert all *.svg?react imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: /react/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              replaceAttrValues: {
                '#A6A6A6': 'currentColor',
                '#a6a6a6': 'currentColor',
              },
            },
          },
        ],
      },
      // Reapply the existing rule, but only for svg imports
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: [/react/] },
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;