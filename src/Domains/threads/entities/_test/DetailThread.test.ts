import { DetailThread } from "../DetailThread";

describe("DetailThread entities", () => {
  it("should throw error when payload not contain needed property", () => {
    const payload = {
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: "2023-10-01T00:00:00.000Z",
      username: "user-123",
    };

    expect(() => new DetailThread(payload as any)).toThrowError("DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error when payload not meet data type specification", () => {
    const payload = {
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: new Date(),
      username: "user-123",
      comments: "not-an-array",
    };

    expect(() => new DetailThread(payload as any)).toThrowError("DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should throw error when comment.content is not a string", () => {
    const payload = {
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: new Date(),
      username: "user-123",
      comments: [
        {
          id: "comment-123",
          username: "user-456",
          date: new Date(),
          content: 12345, // Invalid content type
        },
      ],
    };

    expect(() => new DetailThread(payload as any)).toThrowError("DETAIL_THREAD.COMMENT_NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should throw error when comment.id is not a string", () => {
    const payload = {
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: new Date(),
      username: "user-123",
      comments: [
        {
          id: 123, // Invalid id
          username: "user-456",
          date: new Date(),
          content: "A comment",
        },
      ],
    };

    expect(() => new DetailThread(payload as any)).toThrowError("DETAIL_THREAD.COMMENT_NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should throw error when comment.username is not a string", () => {
    const payload = {
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: new Date(),
      username: "user-123",
      comments: [
        {
          id: "comment-123",
          username: 999, // Invalid username
          date: new Date(),
          content: "A comment",
        },
      ],
    };

    expect(() => new DetailThread(payload as any)).toThrowError("DETAIL_THREAD.COMMENT_NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should throw error when comment.date is not a Date instance", () => {
    const payload = {
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: new Date(),
      username: "user-123",
      comments: [
        {
          id: "comment-123",
          username: "user-456",
          date: "2025-07-14", // Invalid date
          content: "A comment",
        },
      ],
    };

    expect(() => new DetailThread(payload as any)).toThrowError("DETAIL_THREAD.COMMENT_NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should create DetailThread entities correctly", () => {
    const payload = {
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: new Date(),
      username: "user-123",
      comments: [],
    };

    const detailThread = new DetailThread(payload);

    expect(detailThread.id).toEqual(payload.id);
    expect(detailThread.title).toEqual(payload.title);
    expect(detailThread.body).toEqual(payload.body);
    expect(detailThread.date).toEqual(payload.date);
    expect(detailThread.username).toEqual(payload.username);
    expect(detailThread.comments).toEqual(payload.comments);
  });

  it("should accept valid comment object inside comments array", () => {
    const payload = {
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: new Date(),
      username: "user-123",
      comments: [
        {
          id: "comment-123",
          username: "user-456",
          date: new Date(),
          content: "Valid comment",
        },
      ],
    };

    const detailThread = new DetailThread(payload);

    expect(detailThread.comments).toHaveLength(1);
    expect(detailThread.comments[0].id).toBe("comment-123");
    expect(detailThread.comments[0].username).toBe("user-456");
    expect(detailThread.comments[0].content).toBe("Valid comment");
    expect(detailThread.comments[0].date).toBeInstanceOf(Date);
  });
});
