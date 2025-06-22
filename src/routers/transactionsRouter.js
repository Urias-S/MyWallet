import { Router } from "express";
import { addTransaction, getTransactions } from "../controllers/transactionsController.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const transactionsRouter = Router();

transactionsRouter.post('/transactions',userAuth, addTransaction);
transactionsRouter.get('/transactions', userAuth, getTransactions);

export default transactionsRouter;