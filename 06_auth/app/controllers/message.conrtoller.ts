import * as express from 'express';

export class MirrorController {
  public rootPath = '/mirror';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.rootPath, this.reflect);
  }

  reflect = (request: express.Request, response: express.Response) => {
    response.status(200).send(request.body);
  }

}