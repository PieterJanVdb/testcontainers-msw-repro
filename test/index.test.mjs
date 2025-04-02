import { describe, beforeAll, beforeEach, afterAll, afterEach, it, expect } from 'vitest';
import { PostgreSqlContainer } from "@testcontainers/postgresql";

describe('repro', () => {
  let postgresContainer;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer("postgres:16-alpine").start();

    await postgresContainer.snapshot();
  }, 60000);

  afterEach(async () => {
    await postgresContainer.restoreSnapshot();
  }, 60000);

  afterAll(async () => {
    await postgresContainer.stop();
  }, 60000);

  it('should run', () => {
    expect(true).toBe(true);
  });
});


