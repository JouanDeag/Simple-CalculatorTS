import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'window',
  },
  test: {
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
  //   define global: 'window',
  //   plugins: [],
  //   build: {
  //     target: 'esnext',
  //     rollupOptions: {
  //       output: {
  //         manualChunks: {
  //           calc: ['src/calc.ts'],Ö
  //           graphing: ['src/graphing.ts'],
  //           main: ['src/main.ts'],
  //         },
  //       },
  //     },
  //   },
});
