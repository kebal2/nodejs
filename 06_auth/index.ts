import { Application } from "./app/application";
import { MirrorController } from "./app/controllers/message.conrtoller";
import { IApplication } from "./app/i.application";
import { AuthController } from "./app/controllers/auth.controller";
import { RouteHelper } from "./app/helpers/route-helper";

const app: IApplication = new Application(
  [new MirrorController(), new AuthController()],
  RouteHelper.API_BASE_ROUTE
);

app.Start(RouteHelper.port);
