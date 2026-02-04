import '@/app/globals.css';
import type { Preview } from '@storybook/nextjs-vite';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import theme from './theme';

const customViewports = {
  phone: {
    name: 'Phone',
    styles: {
      width: '440px',
      height: '520px',
    },
  },
  tab: {
    name: 'Tab',
    styles: {
      width: '744px',
      height: '640px',
    },
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1024px',
      height: '780px',
    },
  },
  desktopLg: {
    name: 'Desktop Large',
    styles: {
      width: '1280px',
      height: '860px',
    },
  },
  desktopXl: {
    name: 'Desktop Extra Large',
    styles: {
      width: '1440px',
      height: '920px',
    },
  },
  _2k: {
    name: '2K Resolution',
    styles: {
      width: '2048px',
      height: '1040px',
    },
  },
};

const preview: Preview = {
  parameters: {
    docs: {
      theme: theme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
};

export default preview;
