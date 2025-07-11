import { Pool } from "pg";
import { CreateThreadPayload } from "../../Domains/threads/entities/CreateThread";
import { CreatedThread } from "../../Domains/threads/entities/CreatedThread";
import { DetailThread } from "../../Domains/threads/entities/DetailThread";
import { NotFoundError } from "../../Commons/exceptions/NotFoundError";

export class ThreadRepositoryPostgres {
  private _pool: Pool;
  private _idGenerator: any;

  constructor(pool: Pool, idGenerator: any) {
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(thread: CreateThreadPayload): Promise<CreatedThread> {
    const id = this._idGenerator();
    const date = new Date();

    const query = {
      text: "INSERT INTO threads (id, title, body, owner, date) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, owner",
      values: [id, thread.title, thread.body, thread.owner, date],
    };

    const result = await this._pool.query(query);

    return new CreatedThread(result.rows[0]);
  }

  async verifyAvailableThread(threadId: string): Promise<void> {
    const query = {
      text: "SELECT id FROM threads WHERE id = $1",
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError("THREAD_NOT_FOUND");
    }
  }

  async getDetailThread(threadId: string): Promise<DetailThread> {
    const query = {
      text: `
      SELECT 
      threads.id, 
      threads.title, 
      threads.body, 
      threads.date, 
      users.username,
      COALESCE(
      json_agg(
        jsonb_build_object(
        'id', comments.id,
        'username', comment_users.username,
        'date', comments.date,
        'content', comments.content,
        'is_deleted', comments.is_deleted
        )
      ) FILTER (WHERE comments.id IS NOT NULL), 
      '[]'
      ) AS comments
      FROM threads
      JOIN users ON threads.owner = users.id
      LEFT JOIN comments ON comments."threadId" = threads.id
      LEFT JOIN users AS comment_users ON comments.owner = comment_users.id
      WHERE threads.id = $1
      GROUP BY threads.id, users.username
      `,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError("THREAD_NOT_FOUND");
    }

    const threadData = result.rows[0];
    const comments = Array.isArray(threadData.comments)
      ? threadData.comments.map((comment: any) => ({
          ...comment,
          date: new Date(comment.date),
        }))
      : [];

    return new DetailThread({
      id: threadData.id,
      title: threadData.title,
      body: threadData.body,
      date: new Date(threadData.date),
      username: threadData.username,
      comments,
    });
  }
}
