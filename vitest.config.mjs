import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    env: {
      DEBUG: "testcontainers:*",
    },
    setupFiles: ['./test/setup.ts'],
    poolOptions: {
      forks: {
        maxForks: 1,
        minForks: 1,
      },
    },
  },
});
