// import {IUser} from "../document/i.user";
// import {connect} from "mongoose";
// import {User} from "../model/user";
// import {IUserRepository} from "./i.user.repository";

// export class MongoUserRepository extends Repository implements IUserRepository {

//   constructor(private connectionString: string) {
//     super(connectionString);
//   }

//   async addUser(user: IUser): Promise<void> {
//     await connect(this.connectionString, {});

//     const u = new User(user);

//     await u.save();
//   }

//   async users(): Promise<IUser[]> {
//     await connect(this.connectionString);

//     const users = await User.find({}).exec();

//     return users;
//   }
// }
