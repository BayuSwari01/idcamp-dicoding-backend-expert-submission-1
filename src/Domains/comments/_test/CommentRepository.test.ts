import { CommentRepository } from "../CommentRepository";

describe("CommentRepository interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const commentRepository = new CommentRepository();

    // Action and Assert
    await expect(commentRepository.addComment({})).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(commentRepository.verifyCommentIsExist("")).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(commentRepository.verifyCommentOwner("", "")).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(commentRepository.deleteComment("")).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(commentRepository.getCommentsThread("")).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });
});
