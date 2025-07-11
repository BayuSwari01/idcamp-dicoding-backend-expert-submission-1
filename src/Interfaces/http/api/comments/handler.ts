import { Request, ResponseToolkit } from "@hapi/hapi";
import { Container } from "instances-container";
import { AddCommentUseCase } from "../../../../Applications/use_case/AddCommentUseCase";
import { DeleteCommentUseCase } from "../../../../Applications/use_case/DeleteCommentUseCase";

export class CommentsHandler {
  constructor(private container: Container) {
    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(request: Request, h: ResponseToolkit) {
    const { content } = request.payload as { content: string };
    const { id: owner } = request.auth.credentials;
    const { threadId } = request.params;

    const addCommentUseCase = this.container.getInstance(AddCommentUseCase.name);
    const addedComment = await addCommentUseCase.execute({ content, threadId, owner });

    const response = h.response({
      status: "success",
      data: {
        addedComment,
      },
    });

    response.code(201);
    return response;
  }

  async deleteCommentHandler(request: Request) {
    const { id: userId } = request.auth.credentials;
    const { threadId, commentId } = request.params;
    const deleteCommentUseCase = this.container.getInstance(DeleteCommentUseCase.name);
    await deleteCommentUseCase.execute({ threadId, id: commentId, owner: userId });

    return {
      status: "success",
    };
  }
}
