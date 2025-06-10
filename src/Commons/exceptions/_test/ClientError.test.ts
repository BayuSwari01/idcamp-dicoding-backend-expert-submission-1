import { ClientError } from "../ClientError";

describe("ClientError", () => {
  it("should throw error when directly use it", () => {
    expect(() => {
      throw new ClientError("");
    }).toThrowError("cannot instantiate abstract class");
  });
});
