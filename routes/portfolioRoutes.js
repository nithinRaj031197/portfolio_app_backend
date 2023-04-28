import express from "express";
import { authorize } from "../middlewares/permission.js";
import { ADMIN, CANDIDATE, MANAGE_PORTFOLIO, PORTFOLIO, VIEW_PORTFOLIO } from "../enums.js";
import authenticate from "../middlewares/authentication.js";
import { createPortfolio, deletePortfolio, getPortfolioById, getPortfolios, updatePortfolio } from "../controllers/portfolioController.js";

const portfolioRouter = express.Router();

portfolioRouter.get("/:id", getPortfolioById);

portfolioRouter.get("/", authenticate, authorize(ADMIN, MANAGE_PORTFOLIO, PORTFOLIO), getPortfolios);

portfolioRouter.post("/", authenticate, authorize(ADMIN, MANAGE_PORTFOLIO, PORTFOLIO), createPortfolio);

portfolioRouter.put("/:id", authenticate, authorize(ADMIN, MANAGE_PORTFOLIO, PORTFOLIO), updatePortfolio);

portfolioRouter.delete("/:id", authenticate, authorize(ADMIN, MANAGE_PORTFOLIO, PORTFOLIO), deletePortfolio);

export default portfolioRouter;
