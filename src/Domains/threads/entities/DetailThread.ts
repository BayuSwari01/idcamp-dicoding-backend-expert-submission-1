export interface DetailThreadCommentPayload {
  id: string;
  username: string;
  date: string;
  content: string;
}

export interface DetailThreadPayload {
  id: string;
  title: string;
  body: string;
  date: string;
  username: string;
  comments: Array<DetailThreadCommentPayload>;
}

export class DetailThread {
  public id: string;
  public title: string;
  public body: string;
  public date: string;
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
    console.log("Verifying DetailThread payload:", payload);
    console.log(!Array.isArray(payload.comments));
    if (!payload.id || !payload.title || !payload.body || !payload.date || !payload.username || !payload.comments) {
      throw new Error("DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof payload.id !== "string" || typeof payload.title !== "string" || typeof payload.body !== "string" || typeof payload.date !== "string" || typeof payload.username !== "string" || !Array.isArray(payload.comments)) {
      throw new Error("DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    for (const comment of payload.comments) {
      if (typeof comment.id !== "string" || typeof comment.username !== "string" || typeof comment.date !== "string" || typeof comment.content !== "string") {
        throw new Error("DETAIL_THREAD.COMMENT_NOT_MEET_DATA_TYPE_SPECIFICATION");
      }
    }
  }
}
