import { container } from "../../container";
import { createServer } from "../createServer";

describe("/test endpoint", () => {
  describe("when GET /test", () => {
    it("should response 200", async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: "GET",
        url: "/test",
      });

      const responseJSON = await JSON.parse(response.payload);

      expect(response.statusCode).toEqual(200);
      expect(responseJSON.status).toEqual("success");
      expect(responseJSON.message).toEqual("Hello");
    });
  });
});
