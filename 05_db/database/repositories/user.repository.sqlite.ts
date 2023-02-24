import { MikroORM } from "@mikro-orm/core";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { IUser } from "../document/i.user";
import { User } from "../model/user";
import { IUserRepository } from "./i.user.repository";

export class SqliteUserRepository implements IUserRepository {

  constructor(private orm: MikroORM<SqliteDriver>) {
  }

  get UserRepo() {
    return this.orm.em.fork({});
  }
  async addUser(user: IUser): Promise<void> {

    const u = new User();

    u.name = user.name;
    u.email = user.email;
    u.avatar = user.avatar;

    await this.UserRepo.persistAndFlush(u);

  }

  async users(): Promise<IUser[]> {
    const users = await this.UserRepo.getRepository(User).findAll();

    return users;
  }
}
