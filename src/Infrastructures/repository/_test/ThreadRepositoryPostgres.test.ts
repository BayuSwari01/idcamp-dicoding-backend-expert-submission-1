import { ThreadsTableTestHelper } from "../../../../tests/ThreadsTableTestHelper";
import { CommentsTableTestHelper } from "../../../../tests/CommentsTableTestHelper";
import { UsersTableTestHelper } from "../../../../tests/UsersTableTestHelper";
import { pool } from "../../database/postgres/pool";
import { ThreadRepositoryPostgres } from "../ThreadRepositoryPostgres";
import { CommentRepositoryPostgres } from "../CommentRepositoryPostgres";
import { DetailThread } from "../../../Domains/threads/entities/DetailThread";
import { CreatedComment } from "../../../Domains/comments/entities/CreatedComment";

describe("ThreadRepositoryPostgres", () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("addThread function", () => {
    it("should persist thread and return detail thread correctly", async () => {
      await UsersTableTestHelper.addUser({ id: "user-123" });
      // Arrange
      const newThread = {
        title: "A Thread Test",
        body: "A Body Test",
        owner: "user-123",
      };
      const fakeIdGenerator = () => "thread-123"; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const createdThread = await threadRepositoryPostgres.addThread(newThread);

      // Assert
      const threads = await ThreadsTableTestHelper.findThreadsById("thread-123");
      expect(threads).toHaveLength(1);
      expect(threads[0].id).toEqual("thread-123");
      expect(threads[0].title).toEqual(newThread.title);
      expect(threads[0].body).toEqual(newThread.body);
      expect(threads[0].owner).toEqual(newThread.owner);
      expect(createdThread).toEqual({
        id: "thread-123",
        title: newThread.title,
        owner: newThread.owner,
      });
    });
  });

  describe("verifyAvailableThread function", () => {
    it("should throw NotFoundError when thread not available", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.verifyAvailableThread("thread-123")).rejects.toThrowError("THREAD_NOT_FOUND");
    });

    it("should not throw NotFoundError when thread available", async () => {
      // Arrange
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread({ id: "thread-123" });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.verifyAvailableThread("thread-123")).resolves.not.toThrowError("THREAD_NOT_FOUND");
    });
  });

  describe("getDetailThread function", () => {
    it("should return detail thread with comments when thread exists", async () => {
      // Arrange
      const expectedThreadDetail = new DetailThread({
        id: "thread-123",
        title: "A Thread Test",
        body: "A Body Test",
        date: new Date("2023-10-01T00:00:00.000Z"),
        username: "dicoding",
        comments: [],
      });
      const threadPayload = {
        id: "thread-123",
        title: "A Thread Test",
        body: "A Body Test",
        owner: "user-123",
        date: new Date("2023-10-01T00:00:00.000Z"),
      };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread(threadPayload);
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      const thread = await threadRepositoryPostgres.getThreadById(threadPayload.id);
      const comments = await commentRepositoryPostgres.getCommentsThread(threadPayload.id);
      const detailThread = new DetailThread({
        id: thread.id,
        title: thread.title,
        body: thread.body,
        date: new Date(thread.date),
        username: thread.username,
        comments: comments.map((comment: any) => ({
          id: comment.id,
          content: comment.content,
          date: comment.date,
          username: comment.owner,
          isDeleted: comment.isDeleted,
        })),
      });

      // Assert
      expect(detailThread).toEqual(expectedThreadDetail);
    });

    it("should throw NotFoundError when thread does not exist", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.getThreadById("thread-123")).rejects.toThrowError("THREAD_NOT_FOUND");
    });
  });

  describe("getDetailThread with comments", () => {
    it("should return detail thread with comments when thread and comments exist", async () => {
      const fixDate = new Date("2025-07-15T16:17:55.537+07:00");
      // Arrange
      const expectedThread = {
        id: "thread-123",
        title: "A Thread Test",
        body: "A Body Test",
        date: "2025-07-15T16:17:55.537+07:00",
        username: "dicoding",
      };

      const expectedComment = new CreatedComment({
        id: "comment-123",
        threadId: "thread-123",
        content: "A Comment Test",
        date: fixDate,
        owner: "dicoding",
        isDeleted: false, // Assuming comments are not deleted in this test
      });

      const expectedComments = [expectedComment];

      const threadPayload = {
        id: "thread-123",
        title: "A Thread Test",
        body: "A Body Test",
        owner: "user-123",
        date: fixDate,
      };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread(threadPayload);
      // Simulate adding comments to the thread
      await CommentsTableTestHelper.addComment({
        id: "comment-123",
        threadId: threadPayload.id,
        content: "A Comment Test",
        owner: "user-123",
        date: fixDate,
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      const thread = await threadRepositoryPostgres.getThreadById(threadPayload.id);
      const comments = await commentRepositoryPostgres.getCommentsThread(threadPayload.id);

      // Assert
      expect(thread).toEqual(expectedThread);
      expect(comments).toEqual(expectedComments);
    });
  });
});
