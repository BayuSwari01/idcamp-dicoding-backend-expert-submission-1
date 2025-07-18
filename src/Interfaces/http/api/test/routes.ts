import type { TestHandler } from "./handler";

export const routes = (handler: TestHandler) => [
  {
    method: "GET",
    path: "/test",
    handler: handler.getTestHandler,
  },
];
