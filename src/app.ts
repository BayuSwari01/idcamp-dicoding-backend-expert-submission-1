import dotenv from "dotenv";
dotenv.config();
import { container } from "./Infrastructures/container";
import { createServer } from "./Infrastructures/http/createServer";

const start = async () => {
  const server = await createServer(container);
  await server.start();
};

start();
