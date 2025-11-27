import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UserRole } from '../models/User';

export const generateToken = (id: string, role: UserRole, name: string) => {
  return jwt.sign({ id, role, name }, env.jwtSecret, { expiresIn: '7d' });
};

