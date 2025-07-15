import { ThreadRepository } from "../../../Domains/threads/ThreadRepository";
import { AddThreadUseCase } from "../AddThreadUseCase";
import { CreatedThread } from "../../../Domains/threads/entities/CreatedThread";
import { CreateThread } from "../../../Domains/threads/entities/CreateThread";

describe("AddThreadUseCase", () => {
  it("should orchestrating the add thread action correctly", async () => {
    // Arrange
    const expectedThread = new CreatedThread({
      id: "thread-123",
      title: "Thread Title",
      owner: "user-123",
    });

    const mockCreatedThread = new CreatedThread({
      id: "thread-123",
      title: "Thread Title",
      owner: "user-123",
    });

    const payloadCreateThread = new CreateThread({ title: "Thread Title", body: "this is thread", owner: "user-123" });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = jest.fn().mockImplementation(() => Promise.resolve(mockCreatedThread));

    /** creating use case instance */
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const thread = await addThreadUseCase.execute(payloadCreateThread);

    // Assert
    expect(thread).toEqual(expectedThread);
    expect(mockThreadRepository.addThread).toHaveBeenCalledWith(payloadCreateThread);
    expect(mockThreadRepository.addThread).toHaveBeenCalledTimes(1);
  });
});
