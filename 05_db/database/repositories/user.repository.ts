import {IDatabaseDriver} from "@mikro-orm/core/drivers";
import {IReposytory, IUserRepository} from "./i.user.repository";
import {MikroORM} from "@mikro-orm/core";
import {IUser} from "../document/i.user";
import {User} from "../model/user";

export class UserRepository<D extends IDatabaseDriver> implements IUserRepository, IReposytory<D> {

  protected constructor(private orm: MikroORM<D>) {
  }

  get entityManager() {
    return this.orm.em.fork({});
  }

  async addUser(user: IUser): Promise<void> {

    const u = new User(user);

    await this.entityManager.persistAndFlush(u);

  }

  async users(): Promise<IUser[]> {
    const users = await this.entityManager.getRepository(User).findAll();

    return users;
  }
}
