import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { IUser } from "../document/i.user";

@Entity()
export class User implements IUser {

    @PrimaryKey()
    @Index()
    id!: number;

    @Property()
    name!: string;

    @Property()
    email!: string;

    @Property({ nullable: true })
    avatar: string | undefined;

}
