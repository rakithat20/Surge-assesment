import pkg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const { Client } = pkg;

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default db;
