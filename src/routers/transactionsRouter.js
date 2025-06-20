import { Router } from "express";
import { addTransaction } from "../controllers/transactionsController.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const transactionsRouter = Router();

transactionsRouter.post('/transactions',userAuth, addTransaction);

export default transactionsRouter;