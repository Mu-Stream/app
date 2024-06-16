import { defineConfig } from 'electron-vite';
import config from './vite.config';

export default defineConfig({
  main: {
    entry: 'src/main/index.ts',
  },
  preload: {
    input: '',
  },
  renderer: config,
});
