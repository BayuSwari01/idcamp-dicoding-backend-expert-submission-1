import { CommentRepository } from "../../../Domains/comments/CommentRepository";
import { ThreadRepository } from "../../../Domains/threads/ThreadRepository";
import { AddCommentUseCase } from "../AddCommentUseCase";

describe("AddCommentUseCase", () => {
  it("should orchestrating the add comment action correctly", async () => {
    // Arrange
    const useCasePayload = {
      threadId: "thread-123",
      content: "sebuah comment",
      owner: "user-123",
    };

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.verifyAvailableThread = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.addComment = jest.fn().mockImplementation(() => Promise.resolve());

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    await addCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.addComment).toBeCalledWith(useCasePayload);
  });
});
