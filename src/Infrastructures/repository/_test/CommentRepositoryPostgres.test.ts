import { CommentsTableTestHelper } from "../../../../tests/CommentsTableTestHelper";
import { ThreadsTableTestHelper } from "../../../../tests/ThreadsTableTestHelper";
import { UsersTableTestHelper } from "../../../../tests/UsersTableTestHelper";
import { CreatedComment } from "../../../Domains/comments/entities/CreatedComment";
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
      const commentPayload = {
        content: "A Comment Test",
        threadId: "thread-123",
        owner: "user-123",
      };

      const fakeIdGenerator = () => "comment-123";
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({ id: "thread-123" });
      const comment = await commentRepositoryPostgres.addComment(commentPayload);

      expect(comment.date).toBeInstanceOf(Date);
      const expectedComment = new CreatedComment({
        content: "A Comment Test",
        threadId: "thread-123",
        owner: "user-123",
        date: comment.date,
        id: "comment-123",
        isDeleted: false,
      });
      expect(comment).toEqual(expectedComment);

      const persistedComments = await CommentsTableTestHelper.findCommentsById("comment-123");
      expect(persistedComments).toHaveLength(1);
      expect(persistedComments[0]).toEqual(
        expect.objectContaining({
          id: "comment-123",
          content: "A Comment Test",
          threadId: "thread-123",
          owner: "user-123",
          is_deleted: false,
        })
      );
    });
  });

  describe("verifyCommentIsExist function", () => {
    it("should throw NotFoundError when comment not available", async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await expect(commentRepositoryPostgres.verifyCommentIsExist("comment-123")).rejects.toThrowError("COMMENT_NOT_FOUND");
    });

    it("should not throw NotFoundError when comment available", async () => {
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({ id: "thread-123" });
      await CommentsTableTestHelper.addComment({ id: "comment-123", threadId: "thread-123" });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await expect(commentRepositoryPostgres.verifyCommentIsExist("comment-123")).resolves.not.toThrowError("COMMENT_NOT_FOUND");
    });
  });

  describe("deleteComment function", () => {
    it("should delete comment correctly", async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({ id: "thread-123" });
      await CommentsTableTestHelper.addComment({ id: "comment-123", threadId: "thread-123" });

      await commentRepositoryPostgres.deleteComment("comment-123");

      const comments = await CommentsTableTestHelper.findCommentsById("comment-123");
      expect(comments[0].is_deleted).toBe(true);
    });
  });

  describe("verifyCommentOwner function", () => {
    it("should throw NotFoundError when comment owner does not match", async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await expect(commentRepositoryPostgres.verifyCommentOwner("comment-123", "user-123")).rejects.toThrowError("COMMENT_NOT_AUTHORIZED");
    });

    it("should not throw NotFoundError when comment owner matches", async () => {
      await UsersTableTestHelper.addUser({ id: "user-123" });
      await ThreadsTableTestHelper.addThread({ id: "thread-123" });
      await CommentsTableTestHelper.addComment({ id: "comment-123", threadId: "thread-123", owner: "user-123" });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      await expect(commentRepositoryPostgres.verifyCommentOwner("comment-123", "user-123")).resolves.not.toThrowError("COMMENT_NOT_FOUND");
    });
  });

  describe("getCommentsThread function", () => {
    it("should return comments for a given thread", async () => {
      const threadId = "thread-123";
      await UsersTableTestHelper.addUser({ id: "user-123", username: "dicoding" });
      await ThreadsTableTestHelper.addThread({ id: threadId });
      await CommentsTableTestHelper.addComment({
        id: "comment-123",
        threadId: threadId,
        owner: "user-123",
        content: "test content",
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      const comments = await commentRepositoryPostgres.getCommentsThread(threadId);

      expect(comments).toHaveLength(1);
      expect(comments[0]).toEqual(
        expect.objectContaining({
          id: "comment-123",
          content: "test content",
          threadId,
          owner: "dicoding",
          isDeleted: false,
          date: expect.any(Date),
        })
      );
    });

    it("should return an empty array when no comments exist for the thread", async () => {
      const threadId = "thread-123";
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({ id: threadId });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
      const comments = await commentRepositoryPostgres.getCommentsThread(threadId);
      expect(comments).toHaveLength(0);
    });

    it("should default to current date if comment date is null", async () => {
      // Arrange
      const threadId = "thread-456";

      const fakePool = {
        query: jest.fn().mockResolvedValue({
          rows: [
            {
              id: "comment-999",
              content: "This is a test comment",
              username: "dicoding",
              threadId: threadId,
              date: null, // Simulate missing date
              isDeleted: false,
            },
          ],
        }),
      };

      const commentRepositoryPostgres = new CommentRepositoryPostgres(fakePool as any, {});

      // Act
      const comments = await commentRepositoryPostgres.getCommentsThread(threadId);

      // Assert
      expect(comments).toHaveLength(1);
      expect(comments[0]).toBeInstanceOf(CreatedComment);
      expect(comments[0].date).toBeInstanceOf(Date); // ✅ line 93 is now covered
    });
  });
});
