import * as express from "express";

export class TestController {
  public rootPath = "/test";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.rootPath, this.reflect);
  }

  reflect = (req: express.Request, res: express.Response) => {
    const claims = req.session!.tokenSet.claims();

    // render private.mustache and interpolate
    // the following data
    res.render("private", {
      email: claims.email,
      picture: claims.picture,
      name: claims.name,
    });
  };
}
