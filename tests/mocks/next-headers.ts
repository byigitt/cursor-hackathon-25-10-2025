// Mock for next/headers module in tests
export function headers() {
  return new Map();
}

export function cookies() {
  return {
    get: () => null,
    set: () => {},
    delete: () => {},
  };
}
