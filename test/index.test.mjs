import { describe, beforeAll, beforeEach, afterAll, afterEach, it, expect } from 'vitest';
import { PostgreSqlContainer } from "@testcontainers/postgresql";

describe('repro', () => {
  let one;
  let two;

  beforeAll(async () => {
    one = await new PostgreSqlContainer("postgres:16-alpine").start();
    await one.snapshot();
    two = await new PostgreSqlContainer("postgres:16-alpine").start();
    await two.snapshot();
  }, 60000);

  afterEach(async () => {
    await one.restoreSnapshot();
    await two.restoreSnapshot();
  }, 60000);

  afterAll(async () => {
    await one.stop();
    await two.stop();
  }, 60000);

  it('should run', () => {
    expect(true).toBe(true);
  });
});


