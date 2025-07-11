import { Server, ServerRoute } from "@hapi/hapi";
import { CommentsHandler } from "./handler";
import { routes } from "./routes";

interface CommentsPluginOptions {
  container: any;
}

export const commentsPlugin = {
  name: "comments",
  register: async (server: Server, { container }: CommentsPluginOptions) => {
    const commentsHandler = new CommentsHandler(container);
    server.route(routes(commentsHandler) as ServerRoute | ServerRoute[]);
  },
};
