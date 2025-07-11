import { CreateThread } from "../../Domains/threads/entities/CreateThread";
import { ThreadRepository, ThreadRepositoryPayload } from "../../Domains/threads/ThreadRepository";

export class AddThreadUseCase {
  private _threadRepository: ThreadRepository;

  constructor({ threadRepository }: { threadRepository: ThreadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload: ThreadRepositoryPayload): Promise<void> {
    new CreateThread(useCasePayload);
    return await this._threadRepository.addThread(useCasePayload);
  }
}
