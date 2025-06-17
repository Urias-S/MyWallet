import { signInSchema, userSchema } from "../schemas/userSchema.js";
import jwt from "jsonwebtoken"
import db from "../config/database.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

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

export async function signIn(req, res) {
  const {email, password} = req.body;

  const validation = signInSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
    const errors = validation.error.details.map(detail => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const user = await db.collection('users').findOne( {email} );
    if (!user) {
      return res.status(404).send('Email não cadastrado!');
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(401).send('Senha incorreta!');
    }
    const token = jwt.sign({userId: user._id, name: user.name}, process.env.JWT_SECRET);
    return res.status(200).send(token);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
