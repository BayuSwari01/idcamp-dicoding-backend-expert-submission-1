import { InvariantError } from "../../Commons/exceptions/InvariantError";
import { RegisteredUser } from "../../Domains/users/entities/RegisteredUser";
import { UserRepository, type RegisterUserPayload } from "../../Domains/users/UserRepository";

export class UserRepositoryPostgres extends UserRepository {
  private _pool;
  private _idGenerator;

  constructor(pool: any, idGenerator: any) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  override async verifyAvailableUsername(username: string): Promise<void> {
    const query = {
      text: "SELECT username FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError("username tidak tersedia");
    }
  }

  override async addUser(registerUser: RegisterUserPayload): Promise<RegisteredUser> {
    const id = `user-${this._idGenerator()}`;
    const query = {
      text: "INSERT INTO users (id, username, password, fullname) VALUES ($1, $2, $3, $4) RETURNING id, username, fullname",
      values: [id, registerUser.username, registerUser.password, registerUser.fullname],
    };

    const result = await this._pool.query(query);

    return new RegisteredUser({ ...result.rows[0] });
  }

  override async getPasswordByUsername(username: string): Promise<string> {
    const query = {
      text: "SELECT password FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("username tidak ditemukan");
    }

    return result.rows[0].password;
  }

  override async getIdByUsername(username: string): Promise<string> {
    const query = {
      text: "SELECT id FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("user tidak ditemukan");
    }

    const { id } = result.rows[0];
    return id;
  }
}
