import { CommentRepository } from "../../../Domains/comments/CommentRepository";
import { ThreadRepository } from "../../../Domains/threads/ThreadRepository";
import { AddCommentUseCase } from "../AddCommentUseCase";
import { CreatedComment } from "../../../Domains/comments/entities/CreatedComment";

describe("AddCommentUseCase", () => {
  it("should orchestrate the add comment action correctly", async () => {
    // Arrange
    const payload = {
      threadId: "thread-123",
      content: "sebuah comment",
      owner: "user-123",
    };

    const expectedComment = new CreatedComment({
      id: "comment-123",
      threadId: "thread-123",
      content: "sebuah comment",
      owner: "user-123",
    });

    const mockCreatedComment = new CreatedComment({
      id: "comment-123",
      content: "sebuah comment",
      owner: "user-123",
      threadId: "thread-123",
    });

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.verifyAvailableThread = jest.fn().mockResolvedValue(undefined);
    mockCommentRepository.addComment = jest.fn().mockResolvedValue(mockCreatedComment);

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const comment = await addCommentUseCase.execute(expectedComment);

    // Assert
    expect(comment).toStrictEqual(expectedComment);
    expect(mockThreadRepository.verifyAvailableThread).toHaveBeenCalledTimes(1);
    expect(mockThreadRepository.verifyAvailableThread).toHaveBeenCalledWith(payload.threadId);

    expect(mockCommentRepository.addComment).toHaveBeenCalledTimes(1);
    expect(mockCommentRepository.addComment).toHaveBeenCalledWith(expectedComment);
  });
});
