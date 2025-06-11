export class PasswordHash {
  async hash(password: string): Promise<string> {
    throw new Error("PASSWORD_HASH.METHOD_NOT_IMPLEMENTED");
  }
}
