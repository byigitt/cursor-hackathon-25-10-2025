import { beforeAll, afterAll, vi } from 'vitest';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Mock NextAuth to prevent it from trying to parse sessions in test environment
vi.mock('~/server/auth', () => ({
  auth: vi.fn(() => Promise.resolve(null)),
  handlers: {},
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// Mock Next.js server modules that aren't needed in tests
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn(),
    redirect: vi.fn(),
  },
  NextRequest: vi.fn(),
}));

vi.mock('next/headers', () => ({
  headers: vi.fn(() => new Map()),
  cookies: vi.fn(() => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
  })),
}));

// Suppress console logs during tests unless explicitly needed
if (process.env.SUPPRESS_LOGS === 'true') {
  global.console = {
    ...console,
    log: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
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
