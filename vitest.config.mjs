import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    poolOptions: {
      forks: {
        maxForks: 1,
        minForks: 1,
      },
    },
  },
});
