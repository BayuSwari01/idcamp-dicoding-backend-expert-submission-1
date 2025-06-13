import type { Server, Plugin, ServerRoute } from "@hapi/hapi";
import { UsersHandler } from "./handler"; // Assuming UsersHandler is exported from handler.ts
import { routes } from "./routes"; // Assuming routes is a function exported from routes.ts

// Define an interface for the plugin options if you know the structure of 'container'
interface UsersPluginOptions {
  container: any; // Replace 'any' with the actual type of your container
}

export const usersPlugin: Plugin<UsersPluginOptions> = {
  name: "users",
  register: async (server: Server, { container }: UsersPluginOptions) => {
    const usersHandler = new UsersHandler(container);
    server.route(routes(usersHandler) as ServerRoute | ServerRoute[]);
  },
};

// export default usersPlugin;
