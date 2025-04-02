import { describe, beforeAll, afterAll, afterEach, it, expect } from "vitest";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

describe("repro", () => {
  let containerOne: StartedPostgreSqlContainer;

  beforeAll(async () => {
    containerOne = await new PostgreSqlContainer("postgres:16-alpine").start();
    await containerOne.snapshot();
  }, 60000);

  afterEach(async () => {
    await containerOne?.restoreSnapshot();
  }, 60000);

  afterAll(async () => {
    await containerOne?.stop();
  }, 60000);

  it("should run", () => {
    expect(true).toBe(true);
  });
});
