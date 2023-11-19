import { Schema, model } from 'mongoose';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>({
  id: {
    type: String,
    unique: true,
  },
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  createdAt: Date,
  updatedAt: Date,
});

export const User = model<User>('User', userSchema);
