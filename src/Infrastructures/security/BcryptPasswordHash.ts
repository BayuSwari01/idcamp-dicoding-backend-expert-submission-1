import { PasswordHash } from "../../Applications/security/PasswordHash";
import { AuthenticationError } from "../../Commons/exceptions/AuthenticationError";

export class BcryptPasswordHash extends PasswordHash {
  private readonly _bcrypt: any;
  private readonly _saltRound: number;

  constructor(bcrypt: any, saltRound: number = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  async hash(password: string): Promise<string> {
    return await this._bcrypt.hash(password, this._saltRound);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<void> {
    const result = await this._bcrypt.compare(password, hashedPassword);

    if (!result) {
      throw new AuthenticationError("kredensial yang Anda masukkan salah");
    }
  }
}
