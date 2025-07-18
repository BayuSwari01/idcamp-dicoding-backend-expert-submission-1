import { Server, ServerRoute } from "@hapi/hapi";
import { TestHandler } from "./handler";
import { routes } from "./routes";

interface TestPluginOptions {
  container: any;
}

export const testPlugin = {
  name: "test",
  register: async (server: Server, { container }: TestPluginOptions) => {
    const testHandler = new TestHandler(container);
    server.route(routes(testHandler) as ServerRoute | ServerRoute[]);
  },
};
