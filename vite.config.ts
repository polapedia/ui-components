import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(isLib
        ? [
            dts({
              include: ['src'],
              exclude: [
                'src/**/*.stories.*',
                'src/**/*.test.*',
                'src/main.tsx',
                'src/App.tsx',
              ],
              rollupTypes: true,
              tsconfigPath: './tsconfig.app.json',
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Maps '@' to the '/src' directory
      },
    },
    ...(isLib && {
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/lib.ts'),
          formats: ['es', 'cjs'],
          fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime', 'lottie-react'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
        cssFileName: 'ui-components',
        sourcemap: true,
        emptyOutDir: true,
      },
    }),
  };
});
