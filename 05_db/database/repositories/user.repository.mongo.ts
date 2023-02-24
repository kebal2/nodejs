import {UserRepository} from "./user.repository";
import {MikroORM} from "@mikro-orm/core";
import {MongoDriver} from "@mikro-orm/mongodb";

export class MongoUserRepository extends UserRepository<MongoDriver> {

  protected constructor(orm: MikroORM<MongoDriver>) {
    super(orm);
  }

}
