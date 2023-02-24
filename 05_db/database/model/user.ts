import {Entity, Index, PrimaryKey, Property, Unique} from '@mikro-orm/core';
import {IUser} from "../document/i.user";

@Entity()
export class User implements IUser {

  @PrimaryKey()
  @Index()
  id!: number;

  @Property()
  name!: string;

  @Property()
  @Unique()
  email!: string;

  @Property({nullable: true})
  avatar: string | undefined;

  constructor(u?: IUser) {
    if(u){
      this.avatar = u.avatar;
      this.email = u.email;
      this.name = u.name;
    }
  }

}
