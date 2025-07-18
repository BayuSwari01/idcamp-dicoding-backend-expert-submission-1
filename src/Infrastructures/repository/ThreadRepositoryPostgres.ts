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

  async getThreadById(threadId: string): Promise<{ id: string; title: string; body: string; date: Date; username: string }> {
    const query = {
      text: `SELECT t.id, t.title, t.body, t.date, u.username
           FROM threads t
           JOIN users u ON t.owner = u.id
           WHERE t.id = $1`,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError("THREAD_NOT_FOUND");
    }

    result.rows[0].date = new Date(result.rows[0].date);
    return result.rows[0];
  }
}
