import { DetailThread } from "../../../Domains/threads/entities/DetailThread";
import { TransformDetailThreadUseCase } from "../TransformDetailThreadUseCase";

describe("TransformDetailThreadUseCase", () => {
  it("should orchestrating the transform detail thread action correctly", async () => {
    // Arrange
    const expectedDetailThread = new DetailThread({
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: new Date("2023-10-01T00:00:00Z"),
      username: "user-123",
      comments: [
        {
          id: "comment-123",
          content: "**komentar telah dihapus**",
          date: new Date("2023-10-01T01:00:00Z"),
          username: "user-456",
          isDeleted: true,
        },
        {
          id: "comment-456",
          content: "Another Comment",
          date: new Date("2023-10-01T02:00:00Z"),
          username: "user-789",
          isDeleted: false,
        },
      ],
    });

    const useCasePayload = new DetailThread({
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: new Date("2023-10-01T00:00:00Z"),
      username: "user-123",
      comments: [
        {
          id: "comment-123",
          content: "**komentar telah dihapus**",
          date: new Date("2023-10-01T01:00:00Z"),
          username: "user-456",
          isDeleted: true,
        },
        {
          id: "comment-456",
          content: "Another Comment",
          date: new Date("2023-10-01T02:00:00Z"),
          username: "user-789",
          isDeleted: false,
        },
      ],
    });

    const transformDetailThreadUseCase = new TransformDetailThreadUseCase();

    const transformedDetailThread = await transformDetailThreadUseCase.execute(useCasePayload);

    // Assert
    expect(transformedDetailThread).toEqual(expectedDetailThread);
    expect(transformedDetailThread.id).toBe(expectedDetailThread.id);
    expect(transformedDetailThread.title).toBe(expectedDetailThread.title);
    expect(transformedDetailThread.body).toBe(expectedDetailThread.body);
    expect(transformedDetailThread.date).toEqual(expectedDetailThread.date);
    expect(transformedDetailThread.username).toBe(expectedDetailThread.username);
    expect(transformedDetailThread.comments.length).toBe(2);
    expect(transformedDetailThread.comments[0].id).toBe(expectedDetailThread.comments[0].id);
    expect(transformedDetailThread.comments[0].username).toBe(expectedDetailThread.comments[0].username);
    expect(transformedDetailThread.comments[0].date).toEqual(expectedDetailThread.comments[0].date);
    expect(transformedDetailThread.comments[0].content).toBe(expectedDetailThread.comments[0].content);
    expect(transformedDetailThread.comments[0].isDeleted).toBe(expectedDetailThread.comments[0].isDeleted);
  });
});
