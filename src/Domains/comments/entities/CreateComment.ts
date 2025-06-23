export interface CreateCommentPayload {
  content: string;
  owner: string;
  threadId: string;
}

export class CreateComment {
  public content: string;
  public owner: string;
  public threadId: string;

  constructor(payload: CreateCommentPayload) {
    this._verifyPayload(payload);

    this.content = payload.content;
    this.owner = payload.owner;
    this.threadId = payload.threadId;
  }

  _verifyPayload(payload: CreateCommentPayload): void {
    if (!payload.content || !payload.owner || !payload.threadId) {
      throw new Error("CREATE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof typeof payload.content !== "string" || typeof payload.owner !== "string" || typeof payload.threadId !== "string") {
      throw new Error("CREATE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
