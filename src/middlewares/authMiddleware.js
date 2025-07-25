import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function userAuth(req, res, next) {
  const {authorization} = req.headers;
  if (!authorization) return res.status(401).send('Token não enviado!');

  const token = authorization.replace("Bearer", "").trim();

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = userData;
    next();
  } catch (error) {
    return res.status(401).send('Token inválido!');
  }
}