import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config({ path: './env/.env'})

export default defineConfig({
  testDir: './tests',
  
  fullyParallel: true,
  timeout: 10_000,
  retries: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL ?? 'https://demoqa.com/books',
    trace: 'on-first-retry',
  },

  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

  ],

  
 
});
