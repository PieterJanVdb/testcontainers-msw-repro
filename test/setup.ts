import { beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const handlers = [
  http.get("http://some-endpoint.com/test", async () =>
    HttpResponse.json({}, { status: 200 })
  ),
];

const server = setupServer(...handlers);

beforeAll(async () => {
  server.listen({
    onUnhandledRequest(request, print) {
      if (["localhost", "127.0.0.1"].includes(new URL(request.url).hostname)) {
        return;
      }

      print.warning();
    },
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
