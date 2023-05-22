import { CodeChallenge } from "../auth/code-challenge";
import { Config } from "./config";
import { RouteHelper } from "./route-helper";

export class URLSearchParamsHelper {
  static generateAuthorizeParams(): URLSearchParams {
    return new URLSearchParams({
      response_type: Config.RESPONSE_TYPE,
      client_id: Config.CLIENT_ID,
      client_secret: Config.CLIENT_SECRET,
      redirect_uri: RouteHelper.REDIRECT_URI,
      scope: Config.SCOPE,
      state: Config.STATE,
      code_challenge: CodeChallenge.getInstance().challenge,
      code_challenge_method: Config.CODE_CHALLENGE_METHOD,
    });
  }

  static generateCallbackParams(code: string): URLSearchParams {
    return new URLSearchParams({
      grant_type: Config.GRANT_TYPE,
      client_id: Config.CLIENT_ID,
      client_secret: Config.CLIENT_SECRET,
      redirect_uri: RouteHelper.REDIRECT_URI,
      code,
      code_verifier: CodeChallenge.getInstance().verifier,
    });
  }
}
