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
import OrderDB from '@modules/order/data-source.order';
import OrderHistoryRepository from '@modules/order/repository/OrderHistoryRepository';
import OrderHistoryService from '@modules/order/service/OrderHistoryService';
import 'dotenv/config';

const appPort = process.env.SERVER_PORT || 3000;

// Logs
const logger: Logger = new Logger();

// Database
const authDB = new AuthDB();
const orderDB = new OrderDB();

// Module - AUTH
const authRepository = new AuthRepository(authDB);
const authService = new AuthService(authRepository, logger);
const authController = new AuthController(authService);
const authRouter = new AuthRouter(authController);

// Module - ORDER
const orderHistoryRepository = new OrderHistoryRepository(orderDB);
const orderHistoryService = new OrderHistoryService(orderHistoryRepository);
const orderRepository = new OrderRepository(orderDB);
const orderService = new OrderService(
    orderRepository,
    orderHistoryService,
    logger,
);
const orderController = new OrderController(orderService);
const orderRouter = new OrderRouter(orderController);

// GATEWAY
const gateway = new ApiGateway(PATH.GATEWAY);
gateway.addRoute(PATH.AUTH.BASE, authRouter.getRouter());
gateway.addRoute(PATH.ORDER.BASE, orderRouter.getRouter());

// gateway.addRoute('/users', userRouter.getRouter());
const exp: Application = express();
const server = new Server(exp);
const app = new App(appPort, server, gateway);

//Bootstrap
app.init();
