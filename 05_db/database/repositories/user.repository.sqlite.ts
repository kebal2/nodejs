import {MikroORM} from "@mikro-orm/core";
import {SqliteDriver} from "@mikro-orm/sqlite";
import {UserRepository} from "./user.repository";


export class SqliteUserRepository extends UserRepository<SqliteDriver> {

  constructor(orm: MikroORM<SqliteDriver>) {
    super(orm);
  }

}
