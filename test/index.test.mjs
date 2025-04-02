import { describe, beforeAll, beforeEach, afterAll, afterEach, it, expect } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { PostgreSqlContainer } from "@testcontainers/postgresql";

const handlers = [
  http.get('http://some-endpoint.com/test', async () => HttpResponse.json({}, { status: 200 })),
]

describe('repro', () => {
  const server = setupServer(...[]);
  let postgresContainer;

  beforeAll(async () => {
    server.listen({
      onUnhandledRequest(request, print) {
        if (["localhost", "127.0.0.1"].includes(new URL(request.url).hostname)) {
          return;
        }

        print.warning();
      },
    });

    postgresContainer = await new PostgreSqlContainer("postgres:16-alpine").start();

    await postgresContainer.snapshot();
  }, 60000);

  afterEach(async () => {
    server.resetHandlers();

    await postgresContainer.restoreSnapshot();
  }, 60000);

  afterAll(async () => {
    server.close();

    await postgresContainer.stop();
  }, 60000);

  it('should run', () => {
    expect(true).toBe(true);
  });
});


