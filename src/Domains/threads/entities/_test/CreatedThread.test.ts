import { CreateThread } from "../CreateThread";

describe("CreateThread entities", () => {
  it("should throw error when payload not contain needed property", () => {
    const payload = {
      title: "Thread Title",
      body: "Thread Body",
    };

    expect(() => new CreateThread(payload)).toThrowError("CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error when payload not meet data type specification", () => {
    const payload = {
      title: "Thread Title",
      body: "Thread Body",
      owner: 12345,
    };

    expect(() => new CreateThread(payload)).toThrowError("CREATE_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should create CreateThread entities correctly", () => {
    const payload = {
      title: "Thread Title",
      body: "Thread Body",
      owner: "user-123",
    };

    const createThread = new CreateThread(payload);

    expect(createThread.title).toEqual(payload.title);
    expect(createThread.body).toEqual(payload.body);
    expect(createThread.owner).toEqual(payload.owner);
  });
});
