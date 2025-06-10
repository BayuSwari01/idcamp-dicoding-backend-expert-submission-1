import dotenv from "dotenv";
import path from "path";

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: path.resolve(process.cwd(), ".test.env") });
} else {
  dotenv.config();
}

export const config = {
  database: {
    host: process.env.PGHOST || "localhost",
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "password",
    database: process.env.PGDATABASE || "test",
  },
  app: {
    host: process.env.HOST || "localhost",
    port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    debug: process.env.DEBUG === "development" ? { request: ["error"] } : {},
  },
};
