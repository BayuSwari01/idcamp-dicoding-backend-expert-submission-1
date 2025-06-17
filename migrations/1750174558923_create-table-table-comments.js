/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("comments", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    content: {
      type: "TEXT",
      notNull: true,
    },
    owner: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    thread: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    is_delete: {
      type: "BOOLEAN",
      notNull: true,
      default: false,
    },
    date: {
      type: "TEXT",
      notNull: true,
    },
  });
  pgm.addConstraint("comments", "fk_comments.owner_users.id", "FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE");
  pgm.addConstraint("comments", "fk_comments.thread_threads.id", "FOREIGN KEY(thread) REFERENCES threads(id) ON DELETE CASCADE");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropConstraint("comments", "fk_comments.owner_users.id");
  pgm.dropConstraint("comments", "fk_comments.thread_threads.id");
  pgm.dropTable("comments");
};
