import { ClientError } from "../ClientError";
import { AuthorizationError } from "../AuthorizationError";

describe("AuthorizationError", () => {
  it("should create AuthorizationError correctly", () => {
    const authenticationError = new AuthorizationError("authorization error!");

    expect(authenticationError).toBeInstanceOf(AuthorizationError);
    expect(authenticationError).toBeInstanceOf(ClientError);
    expect(authenticationError).toBeInstanceOf(Error);

    expect(authenticationError.statusCode).toEqual(403);
    expect(authenticationError.message).toEqual("authorization error!");
    expect(authenticationError.name).toEqual("AuthorizationError");
  });
});
