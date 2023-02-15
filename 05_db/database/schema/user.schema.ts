import { Schema } from 'mongoose';
import {IUser} from "../document/i.user";

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});
