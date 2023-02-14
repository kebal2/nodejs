import * as express from 'express';
import {Router} from 'express';
import {Controller} from "./controller";
import {IApplicationConfiguration} from "../configuration";
import {connect} from "mongoose";
import {User} from "../../database/model/user";

export class UserController extends Controller {
  static readonly version = 1;

  constructor(private config: IApplicationConfiguration, private router: Router = express.Router()) {
    super(UserController.version);
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, this.users);
    this.router.post(this.path, this.addUser);
  }

  public users = async (request: express.Request, response: express.Response) => {

    await connect(this.config.connectionString);

    const users = await User.find({}).exec();

    response.status(200).send(users);

  }

  public addUser = async (request: express.Request, response: express.Response) => {

    await connect(this.config.connectionString, {});

    const u = request.body as IUser;
    const user = new User(u);

    await user.save();

    response.status(201).send({
      success: true
    });
  }
}
