import { connectMongo } from './db/db';
import express, { Application } from 'express';
import cookie from 'cookie-session';
import { get } from 'config';
import './controllers/AuthenticationController';
import './controllers/DashboardController';
import './controllers/MembersController';
import './controllers/GroupsController';
import { ServerRouter } from './ServerRouter';

class Server {
  public app: Application;
  public port: string | number;
  public mongodb: Promise<void>;

  constructor() {
    this.app = express();
    this.port = process.env.port || 4000;
    this.mongodb = connectMongo();

    this.initializeMiddlewares();
    this.initializeSession();
    this.initializeControllers();
    this.start();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeControllers(): void {
    this.app.use(ServerRouter.getInstance());
  }

  private initializeSession(): void {
    this.app.use(
      cookie({
        name: 'session',
        keys: [get('cookie')],
        maxAge: 1350 * 1000,
      })
    );
  }

  private start(): void {
    this.app.listen(this.port, (): void => {
      console.log(`server started on port ${this.port}`);
    });
  }
}

new Server();
