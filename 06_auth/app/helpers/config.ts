export class Config {
  static AUTH_PORT: number = 3000;
  static CLIENT_ID: string = "CLIENT_ID";
  static CLIENT_SECRET: string = "CLIENT_SECRET";
  static GRANT_TYPE: string = "authorization_code";
  static SCOPE: string = "openid";
  static STATE: string = "random-state";
  static CODE_CHALLENGE_METHOD: string = "S256";
  static RESPONSE_TYPE: string = "code";
}
