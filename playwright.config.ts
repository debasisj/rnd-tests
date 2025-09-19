import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// Get browser from environment variable (default to 'chromium')
const browser = process.env.BROWSER || 'chromium';

// Define browser configurations
const browserConfigs = {
  chromium: {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  firefox: {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  webkit: {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
  edge: {
    name: 'msedge',
    use: { ...devices['Desktop Edge'] },
  },
  all: [
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
};

// Function to get projects based on browser selection
function getProjects() {
  if (browser === 'all') {
    return browserConfigs.all;
  }

  const selectedBrowser =
    browserConfigs[browser as keyof typeof browserConfigs];
  if (!selectedBrowser) {
    console.warn(
      `Browser '${browser}' not supported. Using chromium as default.`
    );
    return [browserConfigs.chromium];
  }

  return Array.isArray(selectedBrowser) ? selectedBrowser : [selectedBrowser];
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.advantageonlineshopping.com',

    /* Collect a screenshot after each test failure */
    screenshot: 'only-on-failure',
    /* Collect a video for each test */
    video: 'retain-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: getProjects(),
});
