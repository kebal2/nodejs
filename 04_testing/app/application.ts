import express, { Application as ea } from "express";
import { IApplication } from "./i.application";


function loggerMiddleware(request: express.Request, response: express.Response, next: any) {
  console.log(`${request.method} ${request.path}`);
  next();
}


export class Application implements IApplication {
  private app: ea;
  private defaultRoute: string;
  private controllers: Array<any>;

  constructor(controllers: Array<any>);
  constructor(controllers: Array<any>, defaultRoute: string);
  constructor(controllers: Array<any>, defaultRoute?: string) {

    this.app = express();

    this.controllers = controllers;
    this.defaultRoute = defaultRoute ?? '/';

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

  Start(port: number) {
    this.app.listen(port, () => {
      console.log(`App listening on the port ${port}`);
    });
  }
}