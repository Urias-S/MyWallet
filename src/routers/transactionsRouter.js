import { Router } from "express";
import { addTransaction, getTransactions, updateTransaction, deleteTransaction } from "../controllers/transactionsController.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const transactionsRouter = Router();

transactionsRouter.post('/transactions', userAuth, addTransaction);
transactionsRouter.get('/transactions', userAuth, getTransactions);
transactionsRouter.put('/transactions/:id', userAuth, updateTransaction);
transactionsRouter.delete('/transactions/:id', userAuth, deleteTransaction);

export default transactionsRouter;