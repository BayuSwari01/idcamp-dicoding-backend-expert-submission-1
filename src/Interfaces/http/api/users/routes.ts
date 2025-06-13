import type { UsersHandler } from "./handler";

export const routes = (handler: UsersHandler) => [
  {
    method: "POST",
    path: "/users",
    handler: handler.postUserHandler,
  },
];
