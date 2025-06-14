import type { Container } from "instances-container";
import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";
import { config } from "../../Commons/config";
import { usersPlugin } from "../../Interfaces/http/api/users/index";
import { DomainErrorTranslator } from "../../Commons/exceptions/DomainErrorTranslator";
import { ClientError } from "../../Commons/exceptions/ClientError";

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

  server.ext("onPreResponse", (request: Request, h: ResponseToolkit) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof Error) {
      // bila response tersebut error, tangani sesuai kebutuhan
      const translatedError: any = DomainErrorTranslator.translate(response);

      // penanganan client error secara internal.
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!translatedError.isServer) {
        return h.continue;
      }

      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: "error",
        message: "terjadi kegagalan pada server kami",
      });
      newResponse.code(500);
      return newResponse;
    }
    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  return server;
};
