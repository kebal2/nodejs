import {IApplicationConfiguration} from "../../app/configuration";
import {Repository} from "./repository";

export class RepositroyFactory {
  constructor(private config: IApplicationConfiguration) {
  }

  get<R extends Repository>(r: new (connectionString: string) => R): R {
    return new r(this.config.connectionString);
  }
}
