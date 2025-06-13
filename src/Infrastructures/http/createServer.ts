import type { Container } from "instances-container";
import Hapi from "@hapi/hapi";
import { config } from "../../Commons/config";
import { usersPlugin } from "../../Interfaces/http/api/users";

export const createServer = async (container: Container) => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    debug: config.app.debug,
  });

  await server.register([
    {
      plugin: usersPlugin,
      options: {
        container,
      },
    },
  ]);

  return server;
};
