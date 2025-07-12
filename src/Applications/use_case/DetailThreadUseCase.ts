import { CommentRepository } from "../../Domains/comments/CommentRepository";
import { CreatedComment } from "../../Domains/comments/entities/CreatedComment";
import { DetailThread } from "../../Domains/threads/entities/DetailThread";
import { ThreadRepository } from "../../Domains/threads/ThreadRepository";

export class DetailThreadUseCase {
  private _threadRepository;
  private _commentRepository;

  constructor({ threadRepository, commentRepository }: { threadRepository: ThreadRepository; commentRepository: CommentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(threadId: string) {
    await this._threadRepository.verifyAvailableThread(threadId);
    const thread = (await this._threadRepository.getThreadById(threadId)) as any;
    const comments = (await this._commentRepository.getCommentsThread(threadId)) as CreatedComment[];

    return new DetailThread({
      id: thread.id,
      title: thread.title,
      body: thread.body,
      date: new Date(thread.date),
      username: thread.username,
      comments: comments.map((comment: any) => ({
        id: comment.id,
        content: comment.content,
        date: comment.date,
        username: comment.owner,
        isDeleted: comment.isDeleted,
      })),
    });
  }
}
