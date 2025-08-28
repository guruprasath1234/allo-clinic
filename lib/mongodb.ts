import { MongoClient } from "mongodb";

const Uri = process.env.NEXT_PUBLIC_DATABASE_URL;
if (!Uri) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

const Client = new MongoClient(Uri);
let isConnected = false;

export default async function ConnectDb() {
  try {
    if (!isConnected) {
      await Client.connect();
      isConnected = true;
      console.log("Connected to MongoDB");
    }
    const db = Client.db("reception");
    const UserSchema = db.collection("User");
    return { UserSchema };
  } catch (err) {
    console.error("Database connection failed:", err);
    throw new Error("invalid url provided");
  }
}