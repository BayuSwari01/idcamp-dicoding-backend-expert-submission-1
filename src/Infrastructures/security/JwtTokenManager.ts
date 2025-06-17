import { AuthenticationTokenManager } from "../../Applications/security/AuthenticationTokenManager";
import { config } from "../../Commons/config";
import { InvariantError } from "../../Commons/exceptions/InvariantError";

export class JwtTokenManager extends AuthenticationTokenManager {
  private _jwt: any;

  constructor(jwt: any) {
    super();
    this._jwt = jwt;
  }

  override async createAccessToken(payload: { username: string }): Promise<string> {
    return await this._jwt.generate(payload, config.token.accessTokenKey);
  }

  override async createRefreshToken(payload: { username: string }): Promise<string> {
    return await this._jwt.generate(payload, config.token.refreshTokenKey);
  }

  override async verifyRefreshToken(token: string): Promise<void> {
    try {
      const artifact = await this._jwt.decode(token);
      await this._jwt.verify(artifact, config.token.refreshTokenKey);
    } catch (error: any) {
      throw new InvariantError("refresh token tidak valid");
    }
  }

  override async decodePayload(token: string): Promise<{ username: string; id: string }> {
    const artifacts = await this._jwt.decode(token);
    return await artifacts.decoded.payload;
  }
}
