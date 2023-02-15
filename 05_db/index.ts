import {Application} from './app/application';
import dotenv from 'dotenv';
import express from "express";
import {IApplicationConfiguration} from "./app/configuration";
import * as fs from "fs";
import {UserController} from "./app/controllers/user.conrtoller";
import {RepositroyFactory} from "./database/repositories/repositroy.factory";
import {MongoUserRepository} from "./database/repositories/user.repository.mongo";

function LoadConfig(): Promise<IApplicationConfiguration> {

  dotenv.config();

  return new Promise((resolve, reject) => {


    const port: number = +(process.env.PORT ?? 0);
    const dbconnectionstring: string = process.env.DB_CONNECTION_STRING ?? "";
    const dbtype: string = process.env.DB_TYPE ?? "";

    fs.readFile('./app.configuration.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject();
        return;
      }

      const conf: IApplicationConfiguration = JSON.parse(data);

      conf.connectionString = dbconnectionstring ? dbconnectionstring : conf.connectionString;
      conf.dbtype = dbtype ? dbtype : conf.dbtype;
      conf.port = port > 0 ? port : conf.port;

      resolve(conf);

    });

  });

}

LoadConfig().then((conf) => {

  const router = express.Router();
  const f = new RepositroyFactory(conf);
  new Application(
    conf,
    [
      new UserController(conf, f.get(MongoUserRepository), router),
    ],
    '/api'
  ).Start();

});
