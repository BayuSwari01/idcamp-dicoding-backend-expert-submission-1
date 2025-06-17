import { UserLogin } from "../../Domains/users/entities/UserLogin";
import { NewAuth } from "../../Domains/authentications/entities/NewAuth";

export class LoginUserUseCase {
  private _userRepository: any;
  private _authenticationRepository: any;
  private _authenticationTokenManager: any;
  private _passwordHash: any;

  constructor({ userRepository, authenticationRepository, authenticationTokenManager, passwordHash }: any) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload: { username: string; password: string }) {
    const { username, password } = new UserLogin(useCasePayload);

    const encryptedPassword = await this._userRepository.getPasswordByUsername(username);

    await this._passwordHash.comparePassword(password, encryptedPassword);

    const id = await this._userRepository.getIdByUsername(username);

    const accessToken = await this._authenticationTokenManager.createAccessToken({ username, id });
    const refreshToken = await this._authenticationTokenManager.createRefreshToken({ username, id });

    const newAuthentication = new NewAuth({
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addToken(newAuthentication.refreshToken);
    return newAuthentication;
  }
}
