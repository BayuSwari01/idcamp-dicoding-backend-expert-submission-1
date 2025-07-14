import { CommentRepository } from "../../../Domains/comments/CommentRepository";
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
      {
        id: "comment-123",
        content: "Comment Content",
        date: new Date("2023-10-01T00:00:00.000Z"),
        owner: "user-456",
        isDeleted: false,
      },
    ];

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.verifyAvailableThread = jest.fn().mockImplementation(() => Promise.resolve());
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve(mockRawThread));
    mockCommentRepository.getCommentsThread = jest.fn().mockImplementation(() => Promise.resolve(mockRawComments));

    const detailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const detailThread = await detailThreadUseCase.execute(useCasePayload);

    // Assert
    expect(detailThread).toBeInstanceOf(DetailThread);
    expect(detailThread.id).toEqual(expectedDetailThread.id);
    expect(detailThread.title).toEqual(expectedDetailThread.title);
    expect(detailThread.body).toEqual(expectedDetailThread.body);
    expect(detailThread.date).toEqual(expectedDetailThread.date);
    expect(detailThread.username).toEqual(expectedDetailThread.username);
    expect(detailThread.comments).toHaveLength(1);
    expect(detailThread.comments[0].id).toEqual(expectedDetailThread.comments[0].id);
    expect(detailThread.comments[0].content).toEqual(expectedDetailThread.comments[0].content);
    expect(detailThread.comments[0].date).toEqual(expectedDetailThread.comments[0].date);
    expect(detailThread.comments[0].username).toEqual(expectedDetailThread.comments[0].username);
    expect(detailThread.comments[0].isDeleted).toEqual(expectedDetailThread.comments[0].isDeleted);
  });
});
