import express from "express";
import dotenv from "dotenv";
import { checkConnection } from "./dbConfig/config.js";
import portfolioRouter from "./routes/portfolioRoutes.js";
import adminRoutes from "./controllers/adminController.js";

const app = express();
app.use(express.json());
dotenv.config();
checkConnection();

//routes
app.use("/api/portfolio", portfolioRouter);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
