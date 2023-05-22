import { Request, Response, NextFunction } from "express";
import { Issuer } from "openid-client";
import { RouteHelper } from "../helpers/route-helper";
import {
  clearSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from "./cookie";
import { deserialize, serialize } from "./session";

export async function initialize(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.app.authIssuer) {
    return next();
  }

  const googleIssuer = await Issuer.discover("https://accounts.google.com");
  console.log("OpendId issuer created");
  const client = new googleIssuer.Client({
    client_id: process.env.OAUTH_CLIENT_ID!,
    client_secret: process.env.OAUTH_CLIENT_SECRET!,
    redirect_uris: ["https://prohardver.hu"],
    response_types: ["code"],
  });

  req.app.authIssuer = googleIssuer;
  req.app.authClient = client;

  next();
}

export async function session(req: Request, res: Response, next: NextFunction) {
  const sessionCookie = getSessionCookie(req);
  if (!sessionCookie) {
    return next();
  }

  const client = req.app.authClient;
  const session = deserialize(sessionCookie);

  if (session.tokenSet.expired()) {
    try {
      const refreshedTokenSet = await client!.refresh(session.tokenSet);
      session.tokenSet = refreshedTokenSet;
      setSessionCookie(res, serialize(session));
    } catch (err) {
      clearSessionCookie(res);
      return next();
    }
  }

  const validate = req.app.authClient?.validateIdToken as any;
  try {
    await validate.call(client, session.tokenSet);
  } catch (err) {
    console.log("bad token signature found in auth cookie");
    return next(new Error("Bad Token in Auth Cookie!"));
  }

  req.session = session;

  next();
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = req.session;
  if (!session) {
    return next(new Error("unauthenticated"));
  }

  next();
}
