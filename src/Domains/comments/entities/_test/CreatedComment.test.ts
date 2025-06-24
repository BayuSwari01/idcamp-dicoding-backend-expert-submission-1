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
    const payload = {
      id: "comment-123",
      content: "Comment Content",
      owner: "user-123",
      threadId: "thread-123",
    };

    const createdComment = new CreatedComment(payload);

    expect(createdComment.id).toEqual(payload.id);
    expect(createdComment.content).toEqual(payload.content);
    expect(createdComment.owner).toEqual(payload.owner);
    expect(createdComment.threadId).toEqual(payload.threadId);
  });
});
