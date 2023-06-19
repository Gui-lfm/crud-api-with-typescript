import { Request, Response, NextFunction } from 'express';
import jwtUtils from '../utils/jwt.utils';

export default async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    jwtUtils.verify(authorization);
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}
