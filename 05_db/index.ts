import {Application} from './app/application';
import dotenv from 'dotenv';
import express from "express";
import {IApplicationConfiguration} from "./app/configuration";
import * as fs from "fs";
import {UserController} from "./app/controllers/user.conrtoller";
import {RepositroyFactory} from "./database/repositories/repositroy.factory";
import {MongoUserRepository} from "./database/repositories/user.repository.mongo";
import type {MongoDriver} from '@mikro-orm/mongodb';
import type {MariaDbDriver} from '@mikro-orm/mariadb';
import {MikroORM} from "@mikro-orm/core";
import {EntityManager} from "@mikro-orm/core/EntityManager";

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

LoadConfig().then(async (conf) => {

  let em: EntityManager;
  switch (conf.dbtype.toLowerCase()) {
    case  'mongo': {

      const orm = await MikroORM.init<MongoDriver>({
        entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
        entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
        dbName: 'test',
      });

      em = orm.em;
    }

      break;
    case 'MariaDb': {

      const orm = await MikroORM.init<MariaDbDriver>({
        entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
        entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
        dbName: 'test',
      });

      em = orm.em;
    }

      break;

    default: throw Error("Unhandled db type [mongo, mariadb]");
  }

  console.log(em); // access EntityManager via `em` property

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
