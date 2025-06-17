import { InvariantError } from "../../Commons/exceptions/InvariantError";
import { AuthenticationRepository } from "../../Domains/authentications/AuthenticationRepository";

export class AuthenticationRepositoryPostgres extends AuthenticationRepository {
  private _pool: any;

  constructor(pool: any) {
    super();
    this._pool = pool;
  }

  override async addToken(token: string): Promise<void> {
    const query = {
      text: "INSERT INTO authentications VALUES($1)",
      values: [token],
    };

    await this._pool.query(query);
  }

  override async checkAvailabilityToken(token: string): Promise<void> {
    const query = {
      text: "SELECT token FROM authentications WHERE token = $1",
      values: [token],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new InvariantError("refresh token tidak ditemukan di database");
    }
  }

  override async deleteToken(token: string): Promise<void> {
    const query = {
      text: "DELETE FROM authentications WHERE token = $1",
      values: [token],
    };

    await this._pool.query(query);
  }
}
