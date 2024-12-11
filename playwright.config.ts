import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    video: process.env.PLAYWRIGHT_VIDEO === 'on' ? 'on' : 'off', 
    trace: 'retain-on-failure', 
  },
});