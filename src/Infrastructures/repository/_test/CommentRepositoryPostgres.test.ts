import { CommentsTableTestHelper } from "../../../../tests/CommentsTableTestHelper";
import { ThreadsTableTestHelper } from "../../../../tests/ThreadsTableTestHelper";
import { UsersTableTestHelper } from "../../../../tests/UsersTableTestHelper";
import { pool } from "../../database/postgres/pool";
import { CommentRepositoryPostgres } from "../CommentRepositoryPostgres";

describe("CommentRepositoryPostgres", () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addComment function", () => {
    it("should persist comment and return created comment correctly", async () => {
      // Arrange
      const comment = {
        content: "A Comment Test",
        threadId: "thread-123",
        owner: "user-123",
      };
      const fakeIdGenerator = () => "comment-123"; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({ id: "thread-123" });
      const createdComment = await commentRepositoryPostgres.addComment(comment);

      // Assert
      const comments = await CommentsTableTestHelper.findCommentsById(createdComment.id);
      expect(comments).toHaveLength(1);
    });
  });

  describe("verifyCommentIsExist function", () => {
    it("should throw NotFoundError when comment not available", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyCommentIsExist("comment-123")).rejects.toThrowError("COMMENT_NOT_FOUND");
    });

    it("should not throw NotFoundError when comment available", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({ id: "thread-123" });
      await CommentsTableTestHelper.addComment({ id: "comment-123", threadId: "thread-123" });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyCommentIsExist("comment-123")).resolves.not.toThrowError("COMMENT_NOT_FOUND");
    });
  });

  describe("deleteComment function", () => {
    it("should delete comment correctly", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({ id: "thread-123" });
      await CommentsTableTestHelper.addComment({ id: "comment-123", threadId: "thread-123" });

      // Action
      await commentRepositoryPostgres.deleteComment("comment-123");

      // Assert
      const comments = await CommentsTableTestHelper.findCommentsById("comment-123");
      expect(comments[0].is_deleted).toBe(true);
    });
  });

  describe("verifyCommentOwner function", () => {
    it("should throw NotFoundError when comment owner does not match", async () => {
      // Arrange
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyCommentOwner("comment-123", "user-123")).rejects.toThrowError("COMMENT_NOT_FOUND");
    });

    it("should not throw NotFoundError when comment owner matches", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: "user-123" });
      await ThreadsTableTestHelper.addThread({ id: "thread-123" });
      await CommentsTableTestHelper.addComment({ id: "comment-123", threadId: "thread-123", owner: "user-123" });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyCommentOwner("comment-123", "user-123")).resolves.not.toThrowError("COMMENT_NOT_FOUND");
    });
  });

  describe("getCommentsThread function", () => {
    it("should return comments for a given thread", async () => {
      // Arrange
      const threadId = "thread-123";
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({ id: threadId });
      await CommentsTableTestHelper.addComment({ id: "comment-123", threadId: threadId });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      const comments = await commentRepositoryPostgres.getCommentsThread(threadId);

      // Assert
      expect(comments).toHaveLength(1);
      expect(comments[0].id).toBe("comment-123");
    });

    it("should return an empty array when no comments exist for the thread", async () => {
      // Arrange
      const threadId = "thread-123";
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({ id: threadId });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      const comments = await commentRepositoryPostgres.getCommentsThread(threadId);

      // Assert
      expect(comments).toHaveLength(0);
    });
  });
});
