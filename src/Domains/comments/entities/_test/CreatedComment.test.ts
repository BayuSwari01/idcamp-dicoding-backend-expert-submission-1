import { CreatedComment } from "../CreatedComment";

describe("CreatedComment entities", () => {
  it("should throw error when payload not contain needed property", () => {
    const payload = {
      content: "Comment Content",
      owner: "user-123",
      threadId: "thread-123",
    };

    expect(() => new CreatedComment(payload)).toThrowError("CREATED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error when payload not meet data type specification", () => {
    const payload = {
      id: "comment-123",
      content: "Comment Content",
      owner: "user-123",
      threadId: 12345, // Invalid type
    };

    expect(() => new CreatedComment(payload)).toThrowError("CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should create CreatedComment entities correctly", () => {
    const expectedComment = new CreatedComment({
      id: "comment-123",
      content: "Comment Content",
      owner: "user-123",
      threadId: "thread-123",
      date: new Date("2025-01-01T10:00:00.000Z"),
    });

    const payloadComment = {
      id: "comment-123",
      content: "Comment Content",
      owner: "user-123",
      threadId: "thread-123",
      date: new Date("2025-01-01T10:00:00.000Z"),
    };

    const comment = new CreatedComment(payloadComment);

    expect(comment).toEqual(expectedComment);
    expect(comment.id).toEqual(expectedComment.id);
    expect(comment.content).toEqual(expectedComment.content);
    expect(comment.owner).toEqual(expectedComment.owner);
    expect(comment.threadId).toEqual(expectedComment.threadId);
    expect(comment.date).toEqual(expectedComment.date); // deep check
    expect(comment.isDeleted).toBe(expectedComment.isDeleted);
  });

  it("should set date to current time when date is not provided", () => {
    // Arrange
    const payload = {
      id: "comment-123",
      content: "Comment Content",
      owner: "user-123",
      threadId: "thread-123",
    };

    const before = new Date(); // waktu sebelum instansiasi
    const comment = new CreatedComment(payload);
    const after = new Date(); // waktu setelah instansiasi

    // Assert
    expect(comment.date).toBeInstanceOf(Date);
    // Pastikan date yang dibuat berada di antara waktu sebelum dan sesudah
    expect(comment.date.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(comment.date.getTime()).toBeLessThanOrEqual(after.getTime());
  });
});
