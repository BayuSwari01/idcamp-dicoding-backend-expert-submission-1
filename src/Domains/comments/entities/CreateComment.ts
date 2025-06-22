export interface CreateCommentPayload {
  id: string;
  content: string;
  owner: string;
  threadId: string;
}

export class CreateComment {
  public id: string;
  public content: string;
  public owner: string;
  public threadId: string;

  constructor(payload: { id: string; content: string; owner: string; threadId: string }) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.content = payload.content;
    this.owner = payload.owner;
    this.threadId = payload.threadId;
  }

  _verifyPayload(payload: { id: string; content: string; owner: string; threadId: string }): void {
    if (!payload.id || !payload.content || !payload.owner || !payload.threadId) {
      throw new Error("CREATE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof payload.id !== "string" || typeof payload.content !== "string" || typeof payload.owner !== "string" || typeof payload.threadId !== "string") {
      throw new Error("CREATE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
