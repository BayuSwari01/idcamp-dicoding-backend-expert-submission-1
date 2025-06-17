import Jwt from "@hapi/jwt";
import { UsersTableTestHelper } from "./UsersTableTestHelper";
import { config } from "../src/Commons/config";

export const ServerTestHelper = {
  async getAccessToken() {
    const userPayload = {
      id: "user-123",
      username: "dicoding",
    };
    await UsersTableTestHelper.addUser(userPayload);
    return Jwt.token.generate(userPayload, config.token.accessTokenKey);
  },
};
