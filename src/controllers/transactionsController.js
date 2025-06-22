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
  
  let page = 1;
  if (req.query.page !== undefined) {
    page = Number(req.query.page);
    if (page < 1) {
      return res.status(400).send('Página inválida, o valor deve ser maior ou igual a 1')
    }
  }
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const allTransactions = await db
    .collection('transactions')
    .find({userId: res.locals.user.userId})
    .skip(skip)
    .limit(limit)
    .toArray();
    allTransactions.reverse();
    return res.status(200).send(allTransactions);

  } catch (error) {
    return res.status(500).send(error.message);
  }

}