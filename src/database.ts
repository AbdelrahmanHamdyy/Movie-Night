// @ts-nocheck
import dotenv from "dotenv";
import { createConnection } from "mysql";

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

let client = createConnection({
  host: HOST,
  user: USERNAME,
  password: PASSWORD,
  database: DB_NAME,
});

export default client;
