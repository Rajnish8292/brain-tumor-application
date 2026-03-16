import jwt from "jsonwebtoken";
const JSON_SECRET_KEY = process.env.JSON_SECRET_KEY;

export function signToken(payload) {
  return jwt.sign(payload, JSON_SECRET_KEY);
}

export function verifyToken(token) {
  return jwt.verify(token, JSON_SECRET_KEY);
}
