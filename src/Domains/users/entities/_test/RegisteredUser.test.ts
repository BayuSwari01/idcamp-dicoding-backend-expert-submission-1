import { RegisteredUser } from "../RegisteredUser";

describe("a RegisteredUser entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      username: "dicoding",
      fullname: "Dicoding Indonesia",
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError("REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY");
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      id: 123,
      username: "dicoding",
      fullname: "Dicoding Indonesia",
    };

    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError("REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
  });

  it("should create registeredUser object correctly", () => {
    // Arrange
    const payload = {
      id: "user-123",
      username: "dicoding",
      fullname: "Dicoding Indonesia",
    };

    // Action
    const registeredUser = new RegisteredUser(payload);

    // Assert
    expect(registeredUser.id).toEqual(payload.id);
    expect(registeredUser.username).toEqual(payload.username);
    expect(registeredUser.fullname).toEqual(payload.fullname);
  });
});
