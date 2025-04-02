import { describe, beforeAll, afterAll, afterEach, it, expect } from "vitest";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

describe("repro", () => {
  let container: StartedPostgreSqlContainer;

  beforeAll(async () => {
    container = await new PostgreSqlContainer("postgres:16-alpine").start();
    await container.snapshot();
  }, 60000);

  afterEach(async () => {
    await container.restoreSnapshot();
  }, 60000);

  afterAll(async () => {
    await container.stop();
  }, 60000);

  it("should run", () => {
    expect(true).toBe(true);
  });
});
