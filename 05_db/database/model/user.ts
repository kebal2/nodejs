import {model} from 'mongoose';
import {userSchema} from "../schema/user.schema";
import {IUser} from "../document/i.user";


export const User = model<IUser>('User', userSchema);
