import { createTopicTableSQL, createPostTableSQL } from "./sql.js";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const loadAndSaveData = async () => {
  try {
    //clear the existing records
    await connection.query(createTopicTableSQL);
    console.log("***created topic table***");

    await connection.query(createPostTableSQL);
    console.log("***created post table***");
  } catch (err) {
    console.error(err);
  }
};

await loadAndSaveData();
process.exit(0);
