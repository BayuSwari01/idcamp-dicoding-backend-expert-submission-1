import { CreatedThread } from "../CreatedThread";

describe("CreatedThread entities", () => {
  it("should throw error when payload not contain needed property", () => {
    const payload = {
      title: "Thread Title",
      owner: "user-123",
    };

    expect(() => new CreatedThread(payload)).toThrowError("CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error when payload not meet data type specification", () => {
    const payload = {
      id: "thread-123",
      title: "Thread Title",
      owner: 12345,
    };

    expect(() => new CreatedThread(payload)).toThrowError("CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should create CreatedThread entities correctly", () => {
    const payload = {
      id: "thread-123",
      title: "Thread Title",
      owner: "user-123",
    };

    const createThread = new CreatedThread(payload);

    expect(createThread.title).toEqual(payload.title);
    expect(createThread.id).toEqual(payload.id);
    expect(createThread.owner).toEqual(payload.owner);
  });
});
