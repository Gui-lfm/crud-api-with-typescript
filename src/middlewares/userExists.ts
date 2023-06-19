import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/user.model';

export default async function userExists(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: '"userId" is required' });
  
  const exists = await UserModel.findByPk(userId);
  if (!exists) return res.status(404).json({ message: '"userId" not found' });

  next();
}
