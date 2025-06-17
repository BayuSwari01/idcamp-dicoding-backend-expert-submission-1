import type { Container } from "instances-container";
import { AddUserUseCase } from "../../../../Applications/use_case/AddUserUseCase";
import { Request, ResponseToolkit } from "@hapi/hapi";

export class UsersHandler {
  private readonly _container;

  constructor(container: Container) {
    this._container = container;
    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request: Request, h: ResponseToolkit) {
    const addUserUseCase = await this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);
    const response = h.response({
      status: "success",
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }
}
