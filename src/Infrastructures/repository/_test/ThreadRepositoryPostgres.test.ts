import { ThreadsTableTestHelper } from "../../../../tests/ThreadsTableTestHelper";
import { CommentsTableTestHelper } from "../../../../tests/CommentsTableTestHelper";
import { UsersTableTestHelper } from "../../../../tests/UsersTableTestHelper";
import { pool } from "../../database/postgres/pool";
import { ThreadRepositoryPostgres } from "../ThreadRepositoryPostgres";

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
      // Arrange
      const thread = {
        id: "thread-123",
        title: "A Thread Test",
        body: "A Body Test",
        owner: "user-123",
        date: new Date(),
      };
      const fakeIdGenerator = () => thread.id; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await UsersTableTestHelper.addUser({});
      await threadRepositoryPostgres.addThread(thread);

      // Assert
      const threads = await ThreadsTableTestHelper.findThreadsById(thread.id);
      expect(threads).toHaveLength(1);
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
      const thread = {
        id: "thread-123",
        title: "A Thread Test",
        body: "A Body Test",
        owner: "user-123",
        date: new Date(),
      };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread(thread);
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action
      const detailThread = await threadRepositoryPostgres.getDetailThread(thread.id);

      // Assert
      expect(detailThread).toEqual({
        id: thread.id,
        title: thread.title,
        body: thread.body,
        date: thread.date,
        username: "dicoding",
        comments: [],
      });
    });

    it("should throw NotFoundError when thread does not exist", async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.getDetailThread("thread-123")).rejects.toThrowError("THREAD_NOT_FOUND");
    });
  });

  describe("getDetailThread with comments", () => {
    it("should return detail thread with comments when thread and comments exist", async () => {
      const fixDate = new Date();
      // Arrange
      const thread = {
        id: "thread-123",
        title: "A Thread Test",
        body: "A Body Test",
        owner: "user-123",
        date: fixDate,
      };
      await UsersTableTestHelper.addUser({});
      await ThreadsTableTestHelper.addThread(thread);
      // Simulate adding comments to the thread
      await CommentsTableTestHelper.addComment({
        id: "comment-123",
        threadId: thread.id,
        content: "A Comment Test",
        owner: "user-123",
        date: fixDate,
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action
      const detailThread = await threadRepositoryPostgres.getDetailThread(thread.id);

      // Assert
      expect(detailThread).toEqual({
        id: thread.id,
        title: thread.title,
        body: thread.body,
        date: thread.date,
        username: "dicoding",
        comments: [
          {
            id: "comment-123",
            username: "dicoding",
            date: fixDate,
            content: "A Comment Test",
            is_deleted: false, // Assuming comments are not deleted in this test
          },
        ],
      });
    });
  });
});
