import { CreateComment } from "../CreateComment";
describe("CreateComment entities", () => {
  it("should throw error when payload not contain needed property", () => {
    const payload = {
      content: "Comment Content",
      owner: "user-123",
    };

    expect(() => new CreateComment(payload)).toThrowError("CREATE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error when payload not meet data type specification", () => {
    const payload = {
      content: "Comment Content",
      owner: "user-123",
      threadId: 12345, // Invalid type
    };

    expect(() => new CreateComment(payload)).toThrowError("CREATE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should create CreateComment entities correctly", () => {
    const payload = {
      content: "Comment Content",
      owner: "user-123",
      threadId: "thread-123",
    };

    const createComment = new CreateComment(payload);

    expect(createComment.content).toEqual(payload.content);
    expect(createComment.owner).toEqual(payload.owner);
    expect(createComment.threadId).toEqual(payload.threadId);
  });
});
