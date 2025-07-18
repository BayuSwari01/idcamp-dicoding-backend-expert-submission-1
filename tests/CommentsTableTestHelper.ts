/* istanbul ignore file */
import { pool } from "../src/Infrastructures/database/postgres/pool";

export const CommentsTableTestHelper = {
  async addComment({ id = "comment-123", content = "comment content", owner = "user-123", threadId = "thread-123", is_deleted = false, date = new Date() }) {
    const query = {
      text: "INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6)",
      values: [id, content, owner, threadId, is_deleted, date],
    };

    await pool.query(query);
  },

  async findCommentsById(id: string) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM comments WHERE 1=1");
  },
};
