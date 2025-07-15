import { CommentRepository } from "../../../Domains/comments/CommentRepository";
import { CreatedComment } from "../../../Domains/comments/entities/CreatedComment";
import { DetailThread } from "../../../Domains/threads/entities/DetailThread";
import { ThreadRepository } from "../../../Domains/threads/ThreadRepository";
import { DetailThreadUseCase } from "../DetailThreadUseCase";

describe("DetailThreadUseCase", () => {
  it("should orchestrating the get detail thread action correctly", async () => {
    // Arrange
    const expectedDetailThread = new DetailThread({
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: new Date("2023-10-01T00:00:00.000Z"),
      username: "user-123",
      comments: [
        {
          id: "comment-123",
          content: "Comment Content",
          date: new Date("2023-10-01T00:00:00.000Z"),
          username: "user-456",
          isDeleted: false,
        },
        {
          id: "comment-456",
          content: "**komentar telah dihapus**",
          date: new Date("2023-10-01T01:00:00.000Z"),
          username: "user-789",
          isDeleted: true,
        },
      ],
    });

    const useCasePayload = "thread-123";

    const mockRawThread = {
      id: "thread-123",
      title: "Thread Title",
      body: "Thread Body",
      date: new Date("2023-10-01T00:00:00.000Z"),
      username: "user-123",
    };

    const mockRawComments = [
      new CreatedComment({
        id: "comment-123",
        content: "Comment Content",
        date: new Date("2023-10-01T00:00:00.000Z"),
        threadId: "thread-123",
        owner: "user-456",
        isDeleted: false,
      }),
      new CreatedComment({
        id: "comment-456",
        content: "**komentar telah dihapus**",
        date: new Date("2023-10-01T01:00:00.000Z"),
        threadId: "thread-123",
        owner: "user-789",
        isDeleted: true,
      }),
    ];

    // Create mock repositories
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    // Mock method implementations
    mockThreadRepository.verifyAvailableThread = jest.fn().mockResolvedValue({});
    mockThreadRepository.getThreadById = jest.fn().mockResolvedValue(mockRawThread);
    mockCommentRepository.getCommentsThread = jest.fn().mockResolvedValue(mockRawComments);

    const detailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Act
    const detailThread = await detailThreadUseCase.execute(useCasePayload);

    // Assert
    expect(detailThread).toBeInstanceOf(DetailThread);
    expect(detailThread.id).toEqual(expectedDetailThread.id);
    expect(detailThread.title).toEqual(expectedDetailThread.title);
    expect(detailThread.body).toEqual(expectedDetailThread.body);
    expect(detailThread.date).toEqual(expectedDetailThread.date);
    expect(detailThread.username).toEqual(expectedDetailThread.username);

    expect(detailThread.comments).toHaveLength(2);
    expect(detailThread.comments[0].id).toEqual(expectedDetailThread.comments[0].id);
    expect(detailThread.comments[0].content).toEqual(expectedDetailThread.comments[0].content);
    expect(detailThread.comments[0].date).toEqual(expectedDetailThread.comments[0].date);
    expect(detailThread.comments[0].username).toEqual(expectedDetailThread.comments[0].username);
    expect(detailThread.comments[0].isDeleted).toEqual(expectedDetailThread.comments[0].isDeleted);

    expect(detailThread.comments[1].id).toEqual(expectedDetailThread.comments[1].id);
    expect(detailThread.comments[1].content).toEqual(expectedDetailThread.comments[1].content);
    expect(detailThread.comments[1].date).toEqual(expectedDetailThread.comments[1].date);
    expect(detailThread.comments[1].username).toEqual(expectedDetailThread.comments[1].username);
    expect(detailThread.comments[1].isDeleted).toEqual(expectedDetailThread.comments[1].isDeleted);
  });
});
