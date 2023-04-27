import express from "express";
import dotenv from "dotenv";
import { checkConnection } from "./dbConfig/config.js";

const app = express();
dotenv.config();
checkConnection();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
