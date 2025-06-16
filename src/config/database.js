import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

let db;

try {
  await mongoClient.connect();
  db = mongoClient.db();
  console.log("Conectado ao servidor do MyWallet!");
} catch (error) {
  console.log(error);
}

export default db;