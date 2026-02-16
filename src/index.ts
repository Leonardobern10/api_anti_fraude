import type { Application } from 'express';
import App from './app/App';
import ApiGateway from './gateway/Gateway.router';
import AuthController from './modules/auth/controller/AuthController';

import AuthService from './modules/auth/service/AuthService.auth';

import express from 'express';
import Server from './server/Server';
import Logger from './logs/Logger';
import 'reflect-metadata';
import Client from './modules/auth/model/entity/Client';
import AuthRepository from './modules/auth/repository/AuthRepository';
import AuthRouter from './modules/auth/router/AuthRouter';
import AuthDB from './modules/auth/data-source.auth';

// Logs
const logger: Logger = new Logger();

// Database
const authDB = new AuthDB();

// Modules
const repository = new AuthRepository(authDB);
const service = new AuthService(repository, logger);
const controller = new AuthController(service);
const authRouter = new AuthRouter(controller);

const gateway = new ApiGateway('/api/v1');
gateway.addRoute('/auth', authRouter.getRouter());
// gateway.addRoute('/orders', orderRouter.getRouter());
// gateway.addRoute('/users', userRouter.getRouter());
const exp: Application = express();
const server = new Server(exp);
const app = new App(3000, server, gateway);

//Bootstrap
app.init();
