import dotenv from "dotenv";
dotenv.config();
import { container } from "./Infrastructures/container";
import { createServer } from "./Infrastructures/http/createServer";
import { config } from "./Commons/config";

const start = async () => {
  const server = await createServer(container);
  await server.start();
  console.log(`Server is running on port ${config.app.port}`);
};

start();
