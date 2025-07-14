import { Pool } from "pg";
import { CreatedComment } from "../../Domains/comments/entities/CreatedComment";
import { NotFoundError } from "../../Commons/exceptions/NotFoundError";
import { AuthorizationError } from "../../Commons/exceptions/AuthorizationError";

export class CommentRepositoryPostgres {
  private _pool: Pool;
  private _idGenerator: any;

  constructor(pool: Pool, idGenerator: any) {
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(comment: { content: string; threadId: string; owner: string }): Promise<CreatedComment> {
    const id = this._idGenerator();
    const date = new Date();

    const query = {
      text: 'INSERT INTO comments (id, content, owner, "threadId", date) VALUES ($1, $2, $3, $4, $5) RETURNING id, content, owner, "threadId"',
      values: [id, comment.content, comment.owner, comment.threadId, date],
    };

    const result = await this._pool.query(query);

    return new CreatedComment({
      id: result.rows[0].id,
      content: result.rows[0].content,
      owner: result.rows[0].owner,
      threadId: result.rows[0].threadId,
    });
  }

  async verifyCommentIsExist(commentId: string): Promise<void> {
    const query = {
      text: "SELECT id FROM comments WHERE id = $1",
      values: [commentId],
    };

    const result = await this._pool.query(query);
    if (result.rowCount === 0) {
      throw new NotFoundError("COMMENT_NOT_FOUND");
    }
  }

  async deleteComment(commentId: string): Promise<void> {
    const query = {
      text: "UPDATE comments SET is_deleted = true WHERE id = $1",
      values: [commentId],
    };

    await this._pool.query(query);
  }

  async verifyCommentOwner(commentId: string, owner: string): Promise<void> {
    const query = {
      text: "SELECT id FROM comments WHERE id = $1 AND owner = $2",
      values: [commentId, owner],
    };

    const result = await this._pool.query(query);
    if (result.rowCount === 0) {
      throw new AuthorizationError("COMMENT_NOT_AUTHORIZED");
    }
  }

  async getCommentsThread(threadId: string): Promise<CreatedComment[]> {
    const query = {
      text: `
        SELECT 
          comments.id, 
          comments.content,
          users.username,
          comments."threadId",
          comments.date,
          comments.is_deleted AS "isDeleted"
        FROM comments
        JOIN users ON users.id = comments.owner
        WHERE comments."threadId" = $1
        ORDER BY comments.date ASC
      `,
      values: [threadId],
    };
    const result = await this._pool.query(query);

    return result.rows.map(
      (row) =>
        new CreatedComment({
          id: row.id,
          content: row.content,
          owner: row.username,
          threadId: row.threadId,
          date: row.date ? new Date(row.date) : new Date(),
          isDeleted: row.isDeleted || false,
        })
    );
  }
}
