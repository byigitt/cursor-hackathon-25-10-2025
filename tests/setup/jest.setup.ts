import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Increase timeout for AI API calls
jest.setTimeout(30000);

// Suppress console logs during tests unless explicitly needed
if (process.env.SUPPRESS_LOGS === 'true') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  };
}

// Global test utilities
beforeAll(() => {
  // Verify required environment variables
  const requiredEnvVars = ['DATABASE_URL', 'GEMINI_API_KEY'];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
});

// Clean up after all tests
afterAll(async () => {
  // Any global cleanup can go here
});
