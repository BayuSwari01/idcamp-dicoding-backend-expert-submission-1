import { Server, ServerRoute } from "@hapi/hapi";
import { AuthenticationsHandler } from "./handler";
import { routes } from "./routes";

interface AuthenticationsPluginOptions {
  container: any;
}

export const authenticationsPlugin = {
  name: "authentications",
  register: async (server: Server, { container }: AuthenticationsPluginOptions) => {
    const authenticationsHandler = new AuthenticationsHandler(container);
    server.route(routes(authenticationsHandler) as ServerRoute | ServerRoute[]);
  },
};
