import { beforeAll, afterAll, afterEach } from "vitest";
import { server } from "./server.js";

beforeAll(async () => {
  server.listen({
    onUnhandledRequest(request, print) {
      if (["localhost", "127.0.0.1"].includes(new URL(request.url).hostname)) {
        console.log("Skipped request");
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
