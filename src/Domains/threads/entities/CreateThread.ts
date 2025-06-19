export interface CreateThreadPayload {
  title: string;
  body: string;
  owner: string;
}

export class CreateThread {
  public title: string;
  public body: string;
  public owner: string;

  constructor(payload: CreateThreadPayload) {
    this._verifyPayload(payload);

    this.title = payload.title;
    this.body = payload.body;
    this.owner = payload.owner;
  }

  _verifyPayload(payload: CreateThreadPayload): void {
    if (!payload.title || !payload.body || !payload.owner) {
      throw new Error("CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof payload.title !== "string" || typeof payload.body !== "string" || typeof payload.owner !== "string") {
      throw new Error("CREATE_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
