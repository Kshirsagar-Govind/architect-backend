// import jwt from 'jsonwebtoken';
import 'dotenv/config';
const jwt = require('jsonwebtoken');

export function generateToken(payload: Object): string {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
  return jwt.sign(payload, secret, { expiresIn });
}
