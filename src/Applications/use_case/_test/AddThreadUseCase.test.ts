import { ThreadRepository } from "../../../Domains/threads/ThreadRepository";
import { AddThreadUseCase } from "../AddThreadUseCase";

describe("AddThreadUseCase", () => {
  it("should orchestrating the add thread action correctly", async () => {
    // Arrange
    const useCasePayload = {
      title: "Thread Title",
      body: "Thread Body",
      owner: "user-123",
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = jest.fn().mockImplementation(() => Promise.resolve("thread-123"));

    /** creating use case instance */
    const addThreadUseCase = new AddThreadUseCase(mockThreadRepository);

    // Action
    const threadId = await addThreadUseCase.execute(useCasePayload);

    // Assert
    expect(threadId).toBe("thread-123");
    expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload);
  });
});
