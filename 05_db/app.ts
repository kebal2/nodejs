import * as fs from "fs";
import dotenv from 'dotenv';
import express from "express";
import {Application} from './app/application';
import {IApplicationConfiguration} from "./app/configuration";
import {MariaDbDriver} from "@mikro-orm/mariadb";
import {MikroORM} from "@mikro-orm/core";
import {MongoDriver} from "@mikro-orm/mongodb";
import {SqlHighlighter} from '@mikro-orm/sql-highlighter';
import {SqliteDriver} from '@mikro-orm/sqlite';
import {SqliteUserRepository} from './database/repositories/user.repository.sqlite';
import {UserController} from "./app/controllers/user.conrtoller";
import {updateSchema} from './database/schema.init';

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

async function dbFact(microOrmSettings: any) {
  switch (microOrmSettings.type) {
    case "sqlite":
      return await MikroORM.init<SqliteDriver>(microOrmSettings);
    case "mariadb":
      return await MikroORM.init<MariaDbDriver>(microOrmSettings);
    case "mongodb":
      return await MikroORM.init<MongoDriver>(microOrmSettings);
    // default:
    //   new Error("Unhanded db type!");
  }
}

LoadConfig()
  .then(async (conf) => {

    // const microOrmSettings: MikroORMOptions = {
    const microOrmSettings: any = {
      entities: ['./dist/database/model'], // path to our JS entities (dist), relative to `baseDir`
      entitiesTs: ['./database/model'], // path to our TS entities (src), relative to `baseDir`
      dbName: 'test.db',
      type: conf.dbtype.toLowerCase(),
      highlighter: new SqlHighlighter(),
      debug: true,
    };

    await updateSchema(microOrmSettings);

    const orm = await dbFact(microOrmSettings);

    const router = express.Router();
    new Application(
      conf,
      [
        new UserController(conf, new SqliteUserRepository(orm as MikroORM<SqliteDriver>), router),
      ],
      '/api'
    ).Start();

  });

