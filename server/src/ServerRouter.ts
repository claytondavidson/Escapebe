import { Router } from 'express';

export class ServerRouter {
  private static instance: Router;

  static getInstance(): Router {
    if (!ServerRouter.instance) {
      ServerRouter.instance = Router();
    }
    return ServerRouter.instance;
  }
}
