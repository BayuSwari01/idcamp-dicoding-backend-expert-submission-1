import { DetailComment } from "../DetailComment";

describe("DetailComment entities", () => {
  it("should throw error when payload not contain needed property", () => {
    const payload = {
      content: "Comment Content",
      username: "user-123",
      threadId: "thread-123",
      date: "2023-10-01T00:00:00Z",
    };

    expect(() => new DetailComment(payload)).toThrowError("DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error when payload not meet data type specification", () => {
    const payload = {
      id: "comment-123",
      content: "Comment Content",
      username: "user-123",
      threadId: "thread-123",
      date: 12345, // Invalid type
    };

    expect(() => new DetailComment(payload)).toThrowError("DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should create DetailComment entities correctly", () => {
    const payload = {
      id: "comment-123",
      content: "Comment Content",
      username: "user-123",
      threadId: "thread-123",
      date: "2023-10-01T00:00:00Z",
    };

    const detailComment = new DetailComment(payload);

    expect(detailComment.id).toEqual(payload.id);
    expect(detailComment.content).toEqual(payload.content);
    expect(detailComment.username).toEqual(payload.username);
    expect(detailComment.threadId).toEqual(payload.threadId);
    expect(detailComment.date).toEqual(payload.date);
  });
});
