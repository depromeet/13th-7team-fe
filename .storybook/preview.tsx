const path = require('path');

import React from 'react';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// TODO: Provider폴더 구조 정해지면 수정해야합니다!
const queryClient = new QueryClient();

import '../src/app/globals.css';

// Initialize MSW
initialize();

const preview: Preview = {
  decorators: [
    mswDecorator,
    Story => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    webpackFinal: async config => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src/'),
      };

      return config;
    },
  },
};

export default preview;
