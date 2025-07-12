export interface CreatedCommentPayload {
  id: string;
  content: string;
  owner: string;
  threadId: string;
  date?: Date;
  isDeleted?: boolean;
}

export class CreatedComment {
  public id: string;
  public content: string;
  public owner: string;
  public threadId: string;
  public date: Date;
  public isDeleted: boolean = false;

  constructor(payload: CreatedCommentPayload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.content = payload.content;
    this.owner = payload.owner;
    this.threadId = payload.threadId;
    this.date = payload.date ? new Date(payload.date) : new Date();
    this.isDeleted = payload.isDeleted || false;
  }

  _verifyPayload(payload: CreatedCommentPayload): void {
    if (!payload.id || !payload.content || !payload.owner || !payload.threadId) {
      throw new Error("CREATED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof payload.id !== "string" || typeof payload.content !== "string" || typeof payload.owner !== "string" || typeof payload.threadId !== "string") {
      throw new Error("CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
