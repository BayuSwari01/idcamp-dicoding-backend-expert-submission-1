import { Request, ResponseToolkit } from "@hapi/hapi";
import { Container } from "instances-container";

export class TestHandler {
  constructor(private container: Container) {}

  async getTestHandler(request: Request, h: ResponseToolkit) {
    const response = h.response({
      status: "success",
      message: "Hello",
    });

    response.code(200);

    return response;
  }
}
