import userSchema from "../schemas/userSchema.js";
import db from "../config/database.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const user = { name, email, password };

  const validation = userSchema.validate(user, { abortEarly: false });
  if (validation.error) {
    const errors = validation.error.details.map(detail => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const validateEmail = await db.collection('users').findOne({ email });
    if (validateEmail) {
      return res.status(409).send('Email já cadastrado!');
    }
    const criptedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({...user, password: criptedPassword});
    return res.status(201).send('Usuário criado com sucesso!');
  } catch (error) {
    res.status(500).send(error.message);
  }
}