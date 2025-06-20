import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";
import transactionsRouter from "./routers/transactionsRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(authRouter);
app.use(transactionsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => { console.log(`Servidor rodando na porta ${PORT}`);});