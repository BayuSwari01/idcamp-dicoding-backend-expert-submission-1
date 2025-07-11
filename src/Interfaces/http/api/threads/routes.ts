import type { ThreadsHandler } from "./handler";

export const routes = (handler: ThreadsHandler) => [
  {
    method: "POST",
    path: "/threads",
    handler: handler.postThreadHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "GET",
    path: "/threads/{threadId}",
    handler: handler.getDetailThreadHandler,
  },
];
