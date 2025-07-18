/* istanbul ignore file */
import { pool } from "../src/Infrastructures/database/postgres/pool";

export const ThreadsTableTestHelper = {
  async addThread(
    {
      id = "thread-123",
      title = "A Thread Test",
      body = "A Body Test",
      owner = "user-123",
      date = new Date(),
    }: {
      id?: string;
      title?: string;
      body?: string;
      owner?: string;
      date?: Date | string;
    } = {} as { id?: string; title?: string; body?: string; owner?: string; date?: Date }
  ) {
    const query = {
      text: "INSERT INTO threads VALUES($1, $2, $3, $4, $5)",
      values: [id, title, body, owner, date],
    };

    await pool.query(query);
  },

  async findThreadsById(id: string) {
    const query = {
      text: "SELECT * FROM threads WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query("DELETE FROM threads WHERE 1=1");
  },
};
