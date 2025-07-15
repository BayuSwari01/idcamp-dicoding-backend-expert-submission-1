import { Request, ResponseToolkit } from "@hapi/hapi";
import { Container } from "instances-container";
import { AddThreadUseCase } from "../../../../Applications/use_case/AddThreadUseCase";
import { DetailThreadUseCase } from "../../../../Applications/use_case/DetailThreadUseCase";
import { TransformDetailThreadUseCase } from "../../../../Applications/use_case/TransformDetailThreadUseCase";

export class ThreadsHandler {
  constructor(private container: Container) {
    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getDetailThreadHandler = this.getDetailThreadHandler.bind(this);
  }

  async postThreadHandler(request: Request, h: ResponseToolkit) {
    const { title, body } = request.payload as { title: string; body: string };
    const { id: owner } = request.auth.credentials;
    const addThreadUseCase = await this.container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute({ title, body, owner });

    const response = h.response({
      status: "success",
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async getDetailThreadHandler(request: Request) {
    const { threadId } = request.params;
    const detailThreadUseCase = await this.container.getInstance(DetailThreadUseCase.name);
    const threadDetails = await detailThreadUseCase.execute(threadId);
    // const transformedThreadDetails = {
    //   ...threadDetails,
    //   comments: threadDetails.comments.map((comment: any) => ({
    //     ...comment,
    //     content: comment.isDeleted ? "**komentar telah dihapus**" : comment.content,
    //   })),
    // };
    const transformThreadDetails = await this.container.getInstance(TransformDetailThreadUseCase.name);
    const transformedThreadDetails = await transformThreadDetails.execute(threadDetails);
    return {
      status: "success",
      data: {
        thread: transformedThreadDetails,
      },
    };
  }
}
