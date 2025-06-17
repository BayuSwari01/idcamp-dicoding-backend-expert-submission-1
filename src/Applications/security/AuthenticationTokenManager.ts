export class AuthenticationTokenManager {
  async createAccessToken(_userId: { username: string }): Promise<string> {
    throw new Error("AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }

  async createRefreshToken(_userId: { username: string }): Promise<string> {
    throw new Error("AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }

  async verifyRefreshToken(_refreshToken: string): Promise<void> {
    throw new Error("AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }

  async decodePayload(_token: string): Promise<Record<string, any>> {
    throw new Error("AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }
}
