import { transactionSchema } from "../schemas/transactionsSchema.js";
import db from "../config/database.js";
import dayjs from "dayjs";

export async function addTransaction(req, res) {
  const {value, description, type} = req.body;

  const validation = transactionSchema.validate(req.body, {abortEarly: false});
  if (validation.error) {
    const errors =validation.error.details.map(detail => detail.message);
    return res.status(422).send(errors);
  }

  const {userId} = res.locals.user;
  const formatedDate = dayjs().format("DD/MM");
  
  try {
    await db.collection('transactions').insertOne({
      ...req.body,
      date: formatedDate,
      userId
    });
    return res.status(201).send('Transação adicionada com sucesso!');
  } catch (error) {
    return res.status(500).send(error.message);
  }


}

export async function getTransactions(req, res) {

}