import { CommentRepository } from "../../../Domains/comments/CommentRepository";
import { DetailThread } from "../../../Domains/threads/entities/DetailThread";
import { ThreadRepository } from "../../../Domains/threads/ThreadRepository";
import { DetailThreadUseCase } from "../DetailThreadUseCase";

describe("DetailThreadUseCase", () => {
  it("should orchestrating the get detail thread action correctly", async () => {
    // Arrange
    const useCasePayload = "thread-123";

    // 1. Definisikan hasil mentah yang akan dikembalikan oleh repository
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

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function - SESUAIKAN DI SINI */
    mockThreadRepository.verifyAvailableThread = jest.fn().mockImplementation(() => Promise.resolve());
    // Mock getThreadById, bukan getDetailThread
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve(mockRawThread));
    // Mock getCommentsByThreadId dari comment repository
    mockCommentRepository.getCommentsThread = jest.fn().mockImplementation(() => Promise.resolve(mockRawComments));

    /** creating use case instance */
    const detailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const detailThread = await detailThreadUseCase.execute(useCasePayload);

    // Assert
    // Bagian Assert sudah benar dan tidak perlu diubah, karena output akhir use case tetap sama
    expect(detailThread).toBeInstanceOf(DetailThread);
    expect(detailThread.id).toEqual("thread-123");
    expect(detailThread.title).toEqual("Thread Title");
    expect(detailThread.body).toEqual("Thread Body");
    expect(detailThread.date).toEqual(new Date("2023-10-01T00:00:00.000Z"));
    expect(detailThread.username).toEqual("user-123");
    expect(detailThread.comments).toHaveLength(1);
    expect(detailThread.comments[0].id).toEqual("comment-123");
  });
});
