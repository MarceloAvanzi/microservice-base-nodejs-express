import IHttpServer from "./IHttpServer";
import express, { Application } from 'express';
import cors from 'cors';
import corsConfig from "./corsConfig";

export default class ExpressHttpServer implements IHttpServer {
  app: Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());

    const corsOptions = corsConfig();
    this.app.use(cors(corsOptions));
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log('Listening on port:', port)
    })
  }
};