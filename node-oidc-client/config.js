class Config {
  static CLIENT_PORT = 3001;
  static AUTH_PORT = 3000;
  static CLIENT_ID = "CLIENT_ID";
  static CLIENT_SECRET = "CLIENT_SECRET";
  static AUTH_ENDPOINT = `http://localhost:${Config.AUTH_PORT}/auth`;
  static TOKEN_ENDPOINT = `http://localhost:${Config.AUTH_PORT}/token`;
  static REDIRECT_URI = `http://localhost:${Config.CLIENT_PORT}/callback`;
  static GRANT_TYPE = "authorization_code";
  static SCOPE = "openid";
  static STATE = "random-state";
  static CODE_CHALLENGE_METHOD = "S256";
  static RESPONSE_TYPE = "code";
}

export default Config;
