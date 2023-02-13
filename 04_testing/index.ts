import { Application } from './app/application';
import { MirrorController } from './app/controllers/mirror.conrtoller';
import { IApplication } from './app/i.application';
import dotenv from 'dotenv';
import express from "express";

dotenv.config();

const port: number = +(process.env.PORT ?? 0);
const version = process.env.VERSION;


const route = `/api/${version}`;

const router = express.Router();

const app: IApplication = new Application(
  [
    new MirrorController(router),
  ],
  route
);

app.Start(port);
