import * as express from "express";
import { EndpointNames } from "../helpers/endpoint-names";
import { RouteHelper } from "../helpers/route-helper";
import { URLSearchParamsHelper } from "../helpers/url-search-params-helper";
import { clearSessionCookie, setSessionCookie } from "../auth/cookie";
import { serialize } from "../auth/session";
import {
  deserializeAuthState,
  getAuthStateCookie,
  serializeAuthState,
  setAuthStateCookie,
} from "../auth/state";

export class AuthController {
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get("/auth/login", this.loginGet);
    this.router.get("/auth/teszt", this.teszt);
  }

  teszt = (req: express.Request, res: express.Response) => {
    console.log("teszteeed");
  };

  loginGet = (req: express.Request, res: express.Response) => {
    const backToPath = (req.query.backTo as string) || "/private";
    const state = serializeAuthState({ backToPath });

    const authUrl = req.app.authClient!.authorizationUrl({
      scope: "openid email profile",
      state,
    });

    setAuthStateCookie(res, state);

    res.redirect(authUrl);
  };

  logoutGet = async (req: express.Request, res: express.Response) => {
    const client = req.app.authClient;
    const tokenSet = req.session?.tokenSet;

    try {
      await client!.revoke(tokenSet!.access_token!);
    } catch (err) {
      console.error("error revoking access_token", err);
    }
    clearSessionCookie(res);

    res.redirect("/");
  };

  logoutSsoGet = (req: express.Request, res: express.Response) => {
    const client = req.app.authClient;

    clearSessionCookie(res);

    const endSessionUrl = client!.endSessionUrl();
    res.redirect(endSessionUrl);
  };
}
