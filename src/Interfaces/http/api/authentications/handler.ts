import { Request, ResponseToolkit } from "@hapi/hapi";
import type { Container } from "instances-container";
import { LoginUserUseCase } from "../../../../Applications/use_case/LoginUserUseCase";
import { RefreshAuthenticationUseCase } from "../../../../Applications/use_case/RefreshAuthenticationUseCase";
import { LogoutUserUseCase } from "../../../../Applications/use_case/LogoutUserUseCase";

export class AuthenticationsHandler {
  private readonly _container;

  constructor(container: Container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request: Request, h: ResponseToolkit) {
    const loginUserUseCase = await this._container.getInstance(LoginUserUseCase.name);
    const { accessToken, refreshToken } = await loginUserUseCase.execute(request.payload);

    const response = h.response({
      status: "success",
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request: Request) {
    const refreshAuthenticationUseCase = await this._container.getInstance(RefreshAuthenticationUseCase.name);
    const accessToken = await refreshAuthenticationUseCase.execute(request.payload);

    return {
      status: "success",
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request: Request) {
    const logoutUserUseCase = await this._container.getInstance(LogoutUserUseCase.name);
    await logoutUserUseCase.execute(request.payload);
    return {
      status: "success",
    };
  }
}
