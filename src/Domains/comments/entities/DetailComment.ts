export interface DetailCommentPayload {
  id: string;
  content: string;
  username: string;
  threadId: string;
  date: string;
}

export class DetailComment {
  public id: string;
  public content: string;
  public username: string;
  public threadId: string;
  public date: string;

  constructor(payload: DetailCommentPayload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.content = payload.content;
    this.username = payload.username;
    this.threadId = payload.threadId;
    this.date = payload.date;
  }

  _verifyPayload(payload: DetailCommentPayload): void {
    if (!payload.id || !payload.content || !payload.username || !payload.threadId || !payload.date) {
      throw new Error("DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof payload.id !== "string" || typeof payload.content !== "string" || typeof payload.username !== "string" || typeof payload.threadId !== "string" || typeof payload.date !== "string") {
      throw new Error("DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
