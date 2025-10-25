import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: [
        'src/server/api/routers/**/*.ts',
        'src/server/schemas/**/*.ts',
        'src/server/lib/gemini.ts',
      ],
      exclude: [
        'src/server/api/routers/post.ts', // Exclude demo router
      ],
    },
    testTimeout: 30000, // 30 seconds for AI API calls
    server: {
      deps: {
        inline: [/@auth/, /next-auth/],
      },
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      'next/server': path.resolve(__dirname, './tests/mocks/next-server.ts'),
      'next/headers': path.resolve(__dirname, './tests/mocks/next-headers.ts'),
    },
    conditions: ['node', 'import', 'module', 'default'],
    mainFields: ['module', 'main'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs'],
  },
});
