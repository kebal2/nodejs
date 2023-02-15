export abstract class Repository {
  protected _connectionString: string;

  constructor(connectionString: string) {
    this._connectionString = connectionString;
  }
}
