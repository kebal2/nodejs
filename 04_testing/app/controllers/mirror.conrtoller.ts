import * as express from 'express';
import {Router} from "express";

export class MirrorController {
  private rootPath = '/mirror';
  constructor(private router: Router = express.Router()) {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(this.rootPath, this.reflect);
    this.router.post(this.rootPath, this.reflect);
  }

  private reflect = (request: express.Request, response: express.Response) => {
    response.status(200).send(request.body);
  }

}
