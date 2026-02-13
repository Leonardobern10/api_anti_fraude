import type { Application } from 'express';
import App from './app/App';
import ApiGateway from './gateway/Gateway.router';
import AuthController from './modules/auth/Controller.auth';
import AuthRepository from './modules/auth/Repository.auth';
import AuthRouter from './modules/auth/Router.auth';
import AuthService from './modules/auth/Service.auth';
import type User from './modules/auth/User';
import express from 'express';
import Server from './server/Server';

const db: Array<User> = [];
const repository = new AuthRepository(db);
const service = new AuthService(repository);
const controller = new AuthController(service);
const authRouter = new AuthRouter(controller);

const gateway = new ApiGateway('/api/v1');
gateway.addRoute('/auth', authRouter.getRouter());
// gateway.addRoute('/orders', orderRouter.getRouter());
// gateway.addRoute('/users', userRouter.getRouter());
const exp: Application = express();
const server = new Server(exp);
const app = new App(3000, server, gateway);

app.init();
