export class DeleteAuthenticationUseCase {
  private _authenticationRepository: any;

  constructor({ authenticationRepository }: any) {
    this._authenticationRepository = authenticationRepository;
  }

  async execute(usecasePayload: { refreshToken: string }) {
    await this._validatePayload(usecasePayload);
    const { refreshToken } = usecasePayload;
    await this._authenticationRepository.checkAvailabilityToken(refreshToken);
    await this._authenticationRepository.deleteToken(refreshToken);
  }

  async _validatePayload(payload: { refreshToken: string }) {
    const { refreshToken } = payload;
    if (!refreshToken) {
      throw new Error("DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN");
    }
    if (typeof refreshToken !== "string") {
      throw new Error("DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
    return refreshToken;
  }
}
