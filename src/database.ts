// @ts-nocheck
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

let DB_NAME;
if (process.env.NODE_ENV.trim() === "testing") {
  DB_NAME = process.env.DB_NAME_TSESTING.trim();
} else {
  DB_NAME = process.env.DB_NAME.trim();
}

const HOST = process.env.DB_HOST;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.DB_PORT;

let client = new Pool({
  database: DB_NAME,
  host: HOST,
  port: Number(PORT),
  user: USERNAME,
  password: PASSWORD,
});

export default client;
