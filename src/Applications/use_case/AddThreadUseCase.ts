import { ThreadRepository, ThreadRepositoryPayload } from "../../Domains/threads/ThreadRepository";

export class AddThreadUseCase {
  private _threadRepository: ThreadRepository;

  constructor(threadRepository: ThreadRepository) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload: ThreadRepositoryPayload): Promise<void> {
    await this._threadRepository.addThread(useCasePayload);
  }
}
