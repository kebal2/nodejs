import {IUser} from "../document/i.user";
import {Repository} from "./repository";

export interface IUserRepository extends Repository{
  users(): Promise<IUser[]>;

  addUser(user: IUser): Promise<void>;
}

