import {Application} from './app/application';
import dotenv from 'dotenv';
import express from "express";
import {IApplicationConfiguration} from "./app/configuration";
import * as fs from "fs";
import {UserController} from "./app/controllers/user.conrtoller";

function LoadConfig(): Promise<IApplicationConfiguration> {

  dotenv.config();

  return new Promise((resolve, reject) => {


    const port: number = +(process.env.PORT ?? 0);
    const dbconnectionstring: string = process.env.DB_CONNECTION_STRING ?? "";

    fs.readFile('./app.configuration.json', 'utf8', (err, data)  => {
      if (err) {
        console.error(err);
        reject();
        return;
      }

      const conf: IApplicationConfiguration = JSON.parse(data);
      console.log(dbconnectionstring);

      conf.connectionString = dbconnectionstring ? dbconnectionstring: conf.connectionString;
      conf.port = port > 0 ? port : conf.port;

      resolve(conf);

    });

  });

}

LoadConfig().then((conf) => {

  const router = express.Router();

  new Application(
    conf,
    [
      new UserController(conf, router),
    ],
    '/api'
  ).Start();

});
