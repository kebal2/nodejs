import { Config } from "./config";
import dotenv from "dotenv";

dotenv.config();

export class RouteHelper {
  static port: number = +(process.env.PORT ?? 0);
  static version = process.env.VERSION;

  static API_BASE_ROUTE: string = `/api/${this.version}`;

  static AUTH_ENDPOINT: string = `http://localhost:${Config.AUTH_PORT}/auth`;
  static TOKEN_ENDPOINT: string = `http://localhost:${Config.AUTH_PORT}/token`;
  static REDIRECT_URI: string = `http://localhost:${this.port}${this.API_BASE_ROUTE}/callback`;
}
