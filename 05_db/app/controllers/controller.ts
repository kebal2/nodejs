import {IController} from "./i.controller";

export class Controller implements IController {
  private readonly _path: string;
  private readonly _apiVersion: number;

  get path(): string {
    return `/${this.version}/${this._path}`;
  }

  get version(): string {
    return `v${this._apiVersion}`;
  }

  constructor(apiVersion: number) {
    this._path = this.constructor.name.replace('Controller', '').toLowerCase();
    this._apiVersion = apiVersion;
  }
}
