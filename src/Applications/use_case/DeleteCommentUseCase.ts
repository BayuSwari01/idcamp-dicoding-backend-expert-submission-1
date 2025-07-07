import { CommentRepository, DeleteCommentRepositoryPayload } from "../../Domains/comments/CommentRepository";
import { ThreadRepository } from "../../Domains/threads/ThreadRepository";

export class DeleteCommentUseCase {
  private _commentRepository;
  private _threadRepository;

  constructor({ commentRepository, threadRepository }: { commentRepository: CommentRepository; threadRepository: ThreadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload: DeleteCommentRepositoryPayload): Promise<void> {
    await this._threadRepository.verifyAvailableThread(useCasePayload.threadId);
    await this._commentRepository.verifyCommentIsExist(useCasePayload.id);
    await this._commentRepository.verifyCommentOwner(useCasePayload.id, useCasePayload.owner);
    await this._commentRepository.deleteComment(useCasePayload.id);
  }
}
