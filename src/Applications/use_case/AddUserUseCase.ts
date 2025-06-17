import { RegisterUser, type RegisterUserPayload } from "../../Domains/users/entities/RegisterUser";
import type { UserRepository } from "../../Domains/users/UserRepository";
import type { PasswordHash } from "../security/PasswordHash";

export class AddUserUseCase {
  public _userRepository;
  public _passwordHash;

  constructor({ userRepository, passwordHash }: { userRepository: UserRepository; passwordHash: PasswordHash }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload: RegisterUserPayload) {
    const registerUser = new RegisterUser(useCasePayload);

    await this._userRepository.verifyAvailableUsername(registerUser.username);

    registerUser.password = await this._passwordHash.hash(registerUser.password);

    return await this._userRepository.addUser(registerUser);
  }
}
