import type { HalloHandler } from "./handler";

export const routes = (handler: HalloHandler) => [
  {
    method: "GET",
    path: "/test",
    handler: handler.getHalloHandler,
  },
];
