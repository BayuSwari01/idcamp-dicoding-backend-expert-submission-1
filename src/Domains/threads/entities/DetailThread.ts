export interface DetailThreadCommentPayload {
  id: string;
  username: string;
  date: Date;
  content: string;
  isDeleted?: boolean;
}

export interface DetailThreadPayload {
  id: string;
  title: string;
  body: string;
  date: Date;
  username: string;
  comments: Array<DetailThreadCommentPayload>;
}

export class DetailThread {
  public id: string;
  public title: string;
  public body: string;
  public date: Date;
  public username: string;
  public comments: Array<DetailThreadCommentPayload>;

  constructor(payload: DetailThreadPayload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.title = payload.title;
    this.body = payload.body;
    this.date = payload.date;
    this.username = payload.username;
    this.comments = payload.comments;
  }

  _verifyPayload(payload: DetailThreadPayload): void {
    if (!payload.id || !payload.title || !payload.body || !payload.date || !payload.username || !payload.comments) {
      throw new Error("DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (!(payload.date instanceof Date) || typeof payload.id !== "string" || typeof payload.title !== "string" || typeof payload.body !== "string" || typeof payload.username !== "string" || !Array.isArray(payload.comments)) {
      throw new Error("DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    for (const comment of payload.comments) {
      if (typeof comment.id !== "string" || typeof comment.username !== "string" || !(comment.date instanceof Date) || typeof comment.content !== "string") {
        throw new Error("DETAIL_THREAD.COMMENT_NOT_MEET_DATA_TYPE_SPECIFICATION");
      }
    }
  }
}
