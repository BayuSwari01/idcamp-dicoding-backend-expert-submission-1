export class RefreshAuthenticationUseCase {
  private _authenticationRepository: any;
  private _authenticationTokenManager: any;

  constructor({ authenticationRepository, authenticationTokenManager }: any) {
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(usecasePayload: { refreshToken: string }) {
    await this._validatePayload(usecasePayload);
    const { refreshToken } = usecasePayload;

    await this._authenticationTokenManager.verifyRefreshToken(refreshToken);
    await this._authenticationRepository.checkAvailabilityToken(refreshToken);

    const { username, id } = await this._authenticationTokenManager.decodePayload(refreshToken);

    return await this._authenticationTokenManager.createAccessToken({ username, id });
  }

  async _validatePayload(payload: { refreshToken: string }) {
    const { refreshToken } = payload;
    if (!refreshToken) {
      throw new Error("REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN");
    }
    if (typeof refreshToken !== "string") {
      throw new Error("REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
