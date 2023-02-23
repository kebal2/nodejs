import * as express from 'express';
import {Router} from 'express';
import {Controller} from "./controller";
import {IApplicationConfiguration} from "../configuration";
import {IUserRepository} from "../../database/repositories/i.user.repository";
import { IUser } from '../../database/document/i.user';

export class UserController extends Controller {
  static readonly version = 1;

  constructor(private config: IApplicationConfiguration, private userRepo: IUserRepository, private router: Router = express.Router()) {
    super(UserController.version);
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.path, this.users);
    this.router.post(this.path, this.addUser);
  }

  public users = async (request: express.Request, response: express.Response) => {

    const users = await this.userRepo.users();

    response.status(200).send(users);

  }

  public addUser = async (request: express.Request, response: express.Response) => {

    try {
      const u = JSON.parse(request.body) as IUser;
      await this.userRepo.addUser(u);

      response.status(201).send({
        success: true
      });

    } catch {
      response.status(500).send({
        success: false
      });

    }
  }
}
