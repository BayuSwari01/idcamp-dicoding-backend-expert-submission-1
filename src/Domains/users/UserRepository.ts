import type { RegisteredUser } from "./entities/RegisteredUser";

export interface RegisterUserPayload {
  username: string;
  password: string;
  fullname: string;
}

export class UserRepository {
  async addUser(registerUser: RegisterUserPayload): Promise<RegisteredUser> {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyAvailableUsername(username: string): Promise<void> {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}
