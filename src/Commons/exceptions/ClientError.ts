export class ClientError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);

    if (this.constructor.name === "ClientError") {
      throw new Error("cannot instantiate abstract class");
    }

    this.statusCode = statusCode;
    this.name = "ClientError";
  }
}
