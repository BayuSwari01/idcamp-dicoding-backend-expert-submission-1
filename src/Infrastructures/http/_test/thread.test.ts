// import { pool } from "../../database/postgres/pool";
// import { ThreadsTableTestHelper } from "../../../../tests/ThreadsTableTestHelper";
// import { UsersTableTestHelper } from "../../../../tests/UsersTableTestHelper";
// import { createServer } from "../createServer";
// import { container } from "../../container";

// describe("/threads endpoint", () => {
//   afterAll(async () => {
//     await pool.end();
//   });

//   afterEach(async () => {
//     await ThreadsTableTestHelper.cleanTable();
//     await UsersTableTestHelper.cleanTable();
//   });

//   beforeAll(async () => {
//     await UsersTableTestHelper.addUser({});
//   });

//   describe("when POST /threads", () => {
//     it("should response 201 and persisted thread", async () => {
//       // Arrange
//       const requestPayload = {
//         title: "Dicoding Indonesia",
//         body: "Ini adalah konten thread",
//       };
//       const server = await createServer(container);

//       // Action
//       const response = await server.inject({
//         method: "POST",
//         url: "/threads",
//         payload: requestPayload,
//       });

//       // Assert
//       const responseJson = JSON.parse(response.payload);
//       expect(response.statusCode).toEqual(201);
//       expect(responseJson.status).toEqual("success");
//       expect(responseJson.data.addedThread).toBeDefined();
//     });

//     it("should response 400 when request payload not contain needed property", async () => {
//       // Arrange
//       const requestPayload = {
//         title: "Dicoding Indonesia",
//       };
//       const server = await createServer(container);

//       // Action
//       const response = await server.inject({
//         method: "POST",
//         url: "/threads",
//         payload: requestPayload,
//       });

//       // Assert
//       const responseJson = JSON.parse(response.payload);
//       expect(response.statusCode).toEqual(400);
//       expect(responseJson.status).toEqual("fail");
//       expect(responseJson.message).toEqual("tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada");
//     });

//     it("should response 400 when request payload not meet data type specification", async () => {
//       // Arrange
//       const requestPayload = {
//         title: "Dicoding Indonesia",
//         body: 12345, // Invalid type
//       };
//       const server = await createServer(container);

//       // Action
//       const response = await server.inject({
//         method: "POST",
//         url: "/threads",
//         payload: requestPayload,
//       });

//       // Assert
//       const responseJson = JSON.parse(response.payload);
//       expect(response.statusCode).toEqual(400);
//       expect(responseJson.status).toEqual("fail");
//       expect(responseJson.message).toEqual("tidak dapat membuat thread baru karena tipe data tidak sesuai");
//     });

//     it("should response 404 when thread not found", async () => {
//       // Arrange
//       const server = await createServer(container);

//       // Action
//       const response = await server.inject({
//         method: "GET",
//         url: "/threads/invalid-thread-id",
//       });

//       // Assert
//       const responseJson = JSON.parse(response.payload);
//       expect(response.statusCode).toEqual(404);
//       expect(responseJson.status).toEqual("fail");
//       expect(responseJson.message).toEqual("thread tidak ditemukan");
//     });

//     it("should response 200 and return thread details", async () => {
//       // Arrange
//       const userId = "user-123";
//       await UsersTableTestHelper.addUser({ id: userId, username: "dicoding" });
//       const threadId = await ThreadsTableTestHelper.addThread({
//         title: "Dicoding Indonesia",
//         body: "Ini adalah konten thread",
//         owner: userId,
//       });
//       const server = await createServer(container);

//       // Action
//       const response = await server.inject({
//         method: "GET",
//         url: `/threads/${threadId}`,
//       });

//       // Assert
//       const responseJson = JSON.parse(response.payload);
//       expect(response.statusCode).toEqual(200);
//       expect(responseJson.status).toEqual("success");
//       expect(responseJson.data.thread).toBeDefined();
//     });
//   });
// });
