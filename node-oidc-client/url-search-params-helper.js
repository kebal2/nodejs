import CodeChallenge from "./code-challenge.js";
import Config from "./config.js";

class URLSearchParamsHelper {
  static generateAuthorizeParams() {
    return new URLSearchParams({
      response_type: Config.RESPONSE_TYPE,
      client_id: Config.CLIENT_ID,
      client_secret: Config.CLIENT_SECRET,
      redirect_uri: Config.REDIRECT_URI,
      scope: Config.SCOPE,
      state: Config.STATE,
      code_challenge: CodeChallenge.codeChallenge,
      code_challenge_method: Config.CODE_CHALLENGE_METHOD,
    });
  }

  static generateCallbackParams(code) {
    return new URLSearchParams({
      grant_type: Config.GRANT_TYPE,
      client_id: Config.CLIENT_ID,
      client_secret: Config.CLIENT_SECRET,
      redirect_uri: Config.REDIRECT_URI,
      code,
      code_verifier: CodeChallenge.codeVerifier,
    });
  }
}

export default URLSearchParamsHelper;
