const { verify } = require('jsonwebtoken');
import { get } from 'config';

export function authToken(req: any, res: any, next: any) {
  const token: string = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'no token, auth denied' });
  }

  try {
    req.member = verify(token, get('jsonwebtokensecret')).member;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'token not valid' });
  }
}
