import {IUser} from "../document/i.user";
import {IDatabaseDriver} from "@mikro-orm/core/drivers";
import {EntityManager} from "@mikro-orm/core/EntityManager";
import {Connection} from "@mikro-orm/core";

export interface IUserRepository {
  users(): Promise<IUser[]>;

  addUser(user: IUser): Promise<void>;
}

export interface IReposytory<D extends IDatabaseDriver> {
  get entityManager(): EntityManager<IDatabaseDriver<Connection>>;

}
