import { ThreadRepository } from "../ThreadRepository";

describe("ThreadRepository interface", () => {
  it("should throw error when invoke abstract method", async () => {
    const threadRepository = new ThreadRepository();

    await expect(threadRepository.addThread({})).rejects.toThrowError("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(threadRepository.getThreadById("")).rejects.toThrowError("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(threadRepository.verifyAvailableThread("")).rejects.toThrowError("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(threadRepository.getThreads()).rejects.toThrowError("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(threadRepository.getDetailThread("")).rejects.toThrowError("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });
});
