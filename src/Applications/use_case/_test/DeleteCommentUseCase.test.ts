import { CommentRepository } from "../../../Domains/comments/CommentRepository";
import { ThreadRepository } from "../../../Domains/threads/ThreadRepository";
import { DeleteCommentUseCase } from "../DeleteCommentUseCase";

describe("DeleteCommentUseCase", () => {
  it("should orchestrating the delete comment action correctly", async () => {
    // Arrange
    const useCasePayload = {
      id: "comment-123",
      threadId: "thread-123",
      owner: "user-123",
    };

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.verifyAvailableThread = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentIsExist = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentOwner = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteComment = jest.fn().mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    await deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.verifyCommentIsExist).toBeCalledWith(useCasePayload.id);
    expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith(useCasePayload.id, useCasePayload.owner);
    expect(mockCommentRepository.deleteComment).toBeCalledWith(useCasePayload.id);
  });
});
