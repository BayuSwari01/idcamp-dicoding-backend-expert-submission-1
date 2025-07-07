export interface CommentRepositoryPayload {
  threadId: string;
  content: string;
}

export interface DeleteCommentRepositoryPayload {
  threadId: string;
  id: string;
  owner: string;
}
export class CommentRepository {
  async addComment(payload: any): Promise<void> {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyCommentIsExist(id: string): Promise<void> {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyCommentOwner(id: string, owner: string): Promise<void> {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteComment(id: string): Promise<void> {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getCommentsThread(threadId: string): Promise<any[]> {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}
