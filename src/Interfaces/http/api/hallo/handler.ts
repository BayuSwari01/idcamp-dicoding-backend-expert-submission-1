import { Request, ResponseToolkit } from "@hapi/hapi";
import { Container } from "instances-container";

export class HalloHandler {
  constructor(private container: Container) {}

  async getHalloHandler(request: Request, h: ResponseToolkit) {
    const response = h.response({
      status: "success",
      message: "Hello",
    });

    response.code(200);

    return response;
  }
}
