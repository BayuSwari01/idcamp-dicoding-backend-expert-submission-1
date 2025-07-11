import { Server, ServerRoute } from "@hapi/hapi";
import { ThreadsHandler } from "./handler";
import { routes } from "./routes";

interface ThreadsPluginOptions {
  container: any;
}

export const threadsPlugin = {
  name: "threads",
  register: async (server: Server, { container }: ThreadsPluginOptions) => {
    const threadsHandler = new ThreadsHandler(container);
    server.route(routes(threadsHandler) as ServerRoute | ServerRoute[]);
  },
};
