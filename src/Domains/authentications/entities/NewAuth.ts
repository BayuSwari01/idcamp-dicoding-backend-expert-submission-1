export class NewAuth {
  public accessToken: string;
  public refreshToken: string;

  constructor(payload: { accessToken: string; refreshToken: string }) {
    this._verifyPayload(payload);

    this.accessToken = payload.accessToken;
    this.refreshToken = payload.refreshToken;
  }

  _verifyPayload({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
    if (!accessToken || !refreshToken) {
      throw new Error("NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY");
    }
    if (typeof accessToken !== "string" || typeof refreshToken !== "string") {
      throw new Error("NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
