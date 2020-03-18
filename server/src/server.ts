import { connectMongo } from './db/db';
import express, { Application } from 'express';
import cookie from 'cookie-session';
import { get } from 'config';

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
    this.app.use('/api/members', require('./api/members'));
    this.app.use('/api/auth', require('./api/auth'));
    this.app.use('/api/groups', require('./api/groups'));
    this.app.use('/api/dashboard', require('./api/dashboard'));
  }

  private initializeSession(): void {
    this.app.use(
      cookie({
        name: 'session',
        keys: [get('cookie')],
        maxAge: 1350 * 1000
      })
    );
  }

  public start(): void {
    this.app.listen(this.port, (): void => {
      console.log(`server started on port ${this.port}`);
    });
  }
}

const server = new Server();
