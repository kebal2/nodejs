import {model} from 'mongoose';
import {userSchema} from "../schema/user.schema";


export const User = model<IUser>('User', userSchema);
