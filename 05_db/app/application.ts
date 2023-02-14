import express, {Application as ea} from "express";
import {IApplication} from "./i.application";
import {IApplicationConfiguration} from "./configuration";


function loggerMiddleware(request: express.Request, response: express.Response, next: any) {
  console.log(`${request.method} ${request.path}`);
  next();
}


export class Application implements IApplication {
  private readonly app: ea;
  private readonly defaultRoute: string;
  private readonly controllers: Array<any>;
  private readonly configuration: IApplicationConfiguration;

  constructor(configuration: IApplicationConfiguration, controllers: Array<any>);
  constructor(configuration: IApplicationConfiguration, controllers: Array<any>, defaultRoute: string);
  constructor(configuration: IApplicationConfiguration, controllers: Array<any>, defaultRoute?: string) {

    this.app = express();

    this.controllers = controllers;
    this.defaultRoute = defaultRoute ?? '/';
    this.configuration = configuration;

    this.InitializeMiddleware();
    this.InitializeControllers();
  }

  InitializeControllers() {
    this.controllers.forEach((controller) => {
      this.app.use(this.defaultRoute, controller.router);
    });
  }

  InitializeMiddleware() {
    this.app.use(express.json());
    this.app.use(loggerMiddleware);
  }

  Start() {
    this.app.listen(this.configuration.port, () => {
      console.log(`App listening on the port ${this.configuration.port}`);
    });
  }
}
