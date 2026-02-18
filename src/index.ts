import type { Application } from 'express';
import App from './app/App';
import ApiGateway from './gateway/Gateway.router';
import AuthController from './modules/auth/controller/AuthController';
import AuthService from './modules/auth/service/AuthService.auth';
import express from 'express';
import Server from './server/Server';
import Logger from './logs/Logger';
import 'reflect-metadata';
import AuthRepository from './modules/auth/repository/AuthRepository';
import AuthRouter from './modules/auth/router/AuthRouter';
import AuthDB from './modules/auth/data-source.auth';
import OrderRepository from '@modules/order/repository/OrderRepository';
import OrderService from '@modules/order/service/OrderService';
import OrderController from '@modules/order/controller/OrderController';
import OrderRouter from '@modules/order/router/OrderRouter';
import { PATH } from '@utils/Path';

// Logs
const logger: Logger = new Logger();

// Database
const authDB = new AuthDB();

// Module - AUTH
const authRepository = new AuthRepository(authDB);
const authService = new AuthService(authRepository, logger);
const authController = new AuthController(authService);
const authRouter = new AuthRouter(authController);

// Module - ORDER
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);
const orderRouter = new OrderRouter(orderController);

// GATEWAY
const gateway = new ApiGateway('/api/v1');
gateway.addRoute(PATH.AUTH.base, authRouter.getRouter());
gateway.addRoute(PATH.ORDER.base, orderRouter.getRouter());

// gateway.addRoute('/users', userRouter.getRouter());
const exp: Application = express();
const server = new Server(exp);
const app = new App(3000, server, gateway);

//Bootstrap
app.init();
