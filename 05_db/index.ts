import { Application } from './app/application';
import dotenv from 'dotenv';
import express from "express";
import { IApplicationConfiguration } from "./app/configuration";
import * as fs from "fs";
import { UserController } from "./app/controllers/user.conrtoller";
import type { MongoDriver } from '@mikro-orm/mongodb';
import type { MariaDbDriver } from '@mikro-orm/mariadb';
import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/core/EntityManager";
import { SqliteDriver } from '@mikro-orm/sqlite';
import { SqliteUserRepository } from './database/repositories/user.repository.sqlite';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
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

LoadConfig().then(async (conf) => {

  let em: EntityManager;

  let microOrmSettings: any = {
    entities: ['./dist/database/model'], // path to our JS entities (dist), relative to `baseDir`
    entitiesTs: ['./database/model'], // path to our TS entities (src), relative to `baseDir`
    dbName: 'test.mdb',
    type: conf.dbtype.toLowerCase(),
    highlighter: new SqlHighlighter(),
    debug: true,
  };
  
  updateSchema(microOrmSettings);

  const orm = await MikroORM.init<SqliteDriver>(microOrmSettings);
  const router = express.Router();
  new Application(
    conf,
    [
      new UserController(conf, new SqliteUserRepository(orm), router),
    ],
    '/api'
  ).Start();

});

