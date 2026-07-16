import { describe, it, expect, beforeEach } from 'vitest';
import { isRateLimited, _resetRateLimitStateForTests } from './rate-limit';

describe('isRateLimited', () => {
  beforeEach(() => {
    _resetRateLimitStateForTests();
  });

  it('allows requests under the limit', () => {
    expect(isRateLimited('user-a', 60_000, 3)).toBe(false);
    expect(isRateLimited('user-a', 60_000, 3)).toBe(false);
    expect(isRateLimited('user-a', 60_000, 3)).toBe(false);
  });

  it('blocks requests once the limit is exceeded within the window', () => {
    isRateLimited('user-b', 60_000, 2);
    isRateLimited('user-b', 60_000, 2);
    expect(isRateLimited('user-b', 60_000, 2)).toBe(true);
  });

  it('tracks separate keys independently', () => {
    isRateLimited('user-c', 60_000, 1);
    expect(isRateLimited('user-c', 60_000, 1)).toBe(true);
    expect(isRateLimited('user-d', 60_000, 1)).toBe(false);
  });

  it('allows requests again once the window has passed', async () => {
    isRateLimited('user-e', 20, 1);
    expect(isRateLimited('user-e', 20, 1)).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 30));
    expect(isRateLimited('user-e', 20, 1)).toBe(false);
  });
});
