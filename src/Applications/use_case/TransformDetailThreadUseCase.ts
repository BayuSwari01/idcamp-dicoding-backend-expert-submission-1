import { DetailThread } from "../../Domains/threads/entities/DetailThread";

export class TransformDetailThreadUseCase {
  constructor() {}

  async execute(detailThread: DetailThread) {
    return {
      ...detailThread,
      comments: detailThread.comments.map((comment: any) => ({
        ...comment,
        content: comment.isDeleted ? "**komentar telah dihapus**" : comment.content,
      })),
    };
  }
}
