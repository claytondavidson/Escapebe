import { Request, Response, NextFunction } from 'express';
import { get } from 'config';
const { verify } = require('jsonwebtoken');

export function authToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'no token, auth denied' });
  }

  try {
    (<any>req).member = verify(token, get('jsonwebtokensecret')).member;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'token not valid' });
  }
}
