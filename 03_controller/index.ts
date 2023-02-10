import { Application } from './app/application';
import { MirrorController } from './app/controllers/message.conrtoller';
import { IApplication } from './app/i.application';
import dotenv from 'dotenv';

dotenv.config();

const port: number = +(process.env.PORT ?? 0);
const version = process.env.VERSION;


const route = `/api/${version}`;

const app: IApplication = new Application(
  [
    new MirrorController(),
  ],
  route
);

app.Start(port);