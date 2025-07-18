import type { Container } from "instances-container";
import Hapi, { Request, ResponseToolkit } from "@hapi/hapi";
import Jwt from "@hapi/jwt";
import { config } from "../../Commons/config";
import { usersPlugin } from "../../Interfaces/http/api/users/index";
import { DomainErrorTranslator } from "../../Commons/exceptions/DomainErrorTranslator";
import { ClientError } from "../../Commons/exceptions/ClientError";
import { authenticationsPlugin } from "../../Interfaces/http/api/authentications/index";
import { threadsPlugin } from "../../Interfaces/http/api/threads/index";
import { commentsPlugin } from "../../Interfaces/http/api/comments/index";
import { halloPlugin } from "../../Interfaces/http/api/hallo/index";

export const createServer = async (container: Container) => {
  const server = Hapi.server({
    host: config.app.host,
    port: config.app.port,
    debug: config.app.debug,
  });

  // external plugin
  await server.register([{ plugin: Jwt }]);

  server.auth.strategy("forumapi_jwt", "jwt", {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts: any) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  // internal plugin
  await server.register([
    {
      plugin: usersPlugin,
      options: {
        container,
      },
    },
    {
      plugin: authenticationsPlugin,
      options: {
        container,
      },
    },
    {
      plugin: threadsPlugin,
      options: {
        container,
      },
    },
    {
      plugin: commentsPlugin,
      options: {
        container,
      },
    },
    {
      plugin: halloPlugin,
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
