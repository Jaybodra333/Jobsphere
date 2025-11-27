import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../utils/generateToken';
import { AuthRequest } from '../middleware/auth';
import { env } from '../config/env';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  let user = await User.findOne({ email });

  // If admin does not exist yet, automatically create on first login
  if (!user && email === env.admin.email) {
    user = await User.create({
      name: env.admin.name,
      email,
      password,
      role: 'admin',
    });
  }

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const userId = user._id.toString();
  const token = generateToken(userId, user.role, user.name);
  res.json({
    token,
    user: {
      id: userId,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const me = async (req: AuthRequest, res: Response) => {
  res.json({ user: req.user });
};

