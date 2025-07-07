import { CommentRepository, CommentRepositoryPayload } from "../../Domains/comments/CommentRepository";
import { ThreadRepository } from "../../Domains/threads/ThreadRepository";

export class AddCommentUseCase {
  private _commentRepository: CommentRepository;
  private _threadRepository: ThreadRepository;

  constructor({ commentRepository, threadRepository }: { commentRepository: CommentRepository; threadRepository: ThreadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload: CommentRepositoryPayload): Promise<void> {
    await this._threadRepository.verifyAvailableThread(useCasePayload.threadId);
    return await this._commentRepository.addComment(useCasePayload);
  }
}
