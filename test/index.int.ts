import { describe, beforeAll, afterAll, afterEach, it, expect } from "vitest";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";

describe("repro", () => {
  let containerOne: StartedPostgreSqlContainer;
  let containerTwo: StartedPostgreSqlContainer;

  beforeAll(async () => {
    containerOne = await new PostgreSqlContainer("postgres:16-alpine").start();
    await containerOne.snapshot();

    containerTwo = await new PostgreSqlContainer("postgres:16-alpine").start();
    await containerTwo.snapshot();
  }, 60000);

  afterEach(async () => {
    await containerOne?.restoreSnapshot();
    await containerTwo?.restoreSnapshot();
  }, 60000);

  afterAll(async () => {
    await containerOne?.stop();
    await containerTwo?.stop();
  }, 60000);

  it("should run", () => {
    expect(true).toBe(true);
  });
});
