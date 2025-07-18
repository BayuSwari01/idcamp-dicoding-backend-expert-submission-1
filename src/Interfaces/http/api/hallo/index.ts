import { Server, ServerRoute } from "@hapi/hapi";
import { HalloHandler } from "./handler";
import { routes } from "./routes";

interface HalloPluginOptions {
  container: any;
}

export const halloPlugin = {
  name: "hallo",
  register: async (server: Server, { container }: HalloPluginOptions) => {
    const halloHandler = new HalloHandler(container);
    server.route(routes(halloHandler) as ServerRoute | ServerRoute[]);
  },
};
