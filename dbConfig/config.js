import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// const mongoURI = "mongodb://localhost/myDatabase";
const mongoURI = process.env.MONGDB_URI;

export async function checkConnection() {
  await mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}
