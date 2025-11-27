import bcrypt from 'bcryptjs';
import { Schema, model, Document } from 'mongoose';

export type UserRole = 'admin' | 'user';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  comparePassword: (candidate: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = function (
  this: IUser,
  candidate: string,
) {
  return bcrypt.compare(candidate, this.password);
};

export const User = model<IUser>('User', userSchema);

