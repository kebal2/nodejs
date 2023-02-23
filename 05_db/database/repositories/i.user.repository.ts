import {IUser} from "../document/i.user";

export interface IUserRepository {
  users(): Promise<IUser[]>;

  addUser(user: IUser): Promise<void>;
}

