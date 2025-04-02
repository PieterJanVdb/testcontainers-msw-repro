import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    env: {
      DEBUG: "testcontainers:*",
    },
    include: ["./test/**/*.test.ts"],
    setupFiles: ['./test/setup.ts'],
    mockReset: true,
    coverage: {
      enabled: false,
    },
    poolOptions: {
      forks: {
        maxForks: 1,
        minForks: 1,
      },
    },
  },
});
