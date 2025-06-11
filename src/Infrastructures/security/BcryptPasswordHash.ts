import { PasswordHash } from "../../Applications/security/PasswordHash";

export class BcryptPasswordHash extends PasswordHash {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly _bcrypt: any;
  private readonly _saltRound: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(bcrypt: any, saltRound: number = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  async hash(password: string): Promise<string> {
    return this._bcrypt.hash(password, this._saltRound);
  }
}
