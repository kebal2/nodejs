import * as express from "express";
import { EndpointNames } from "../helpers/endpoint-names";
import { RouteHelper } from "../helpers/route-helper";
import { URLSearchParamsHelper } from "../helpers/url-search-params-helper";

export class AuthController {
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(EndpointNames.AUTHORIZE, this.authGet);
    this.router.get(EndpointNames.CALLBACK, this.callbackGet);
  }

  authGet = (req: express.Request, res: express.Response) => {
    const params = URLSearchParamsHelper.generateAuthorizeParams();

    const authorizationUrl = `${RouteHelper.AUTH_ENDPOINT}?${params.toString()}`;

    res.redirect(authorizationUrl);
  };

  callbackGet = async (req: express.Request, res: express.Response) => {
    try {
      const { code } = req.query;

      if (!code) {
        throw new Error("Code not found in request");
      }

      const params = URLSearchParamsHelper.generateCallbackParams(
        code as string
      );

      const response = await fetch(RouteHelper.TOKEN_ENDPOINT, {
        method: "POST",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const token = await response.json();

      res.json(token);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };
}
