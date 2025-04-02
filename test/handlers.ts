import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://some-endpoint.com/test", async () => {
    return HttpResponse.json(
      {
        message: "Hello, world!",
      },
      { status: 200 }
    );
  }),
];
