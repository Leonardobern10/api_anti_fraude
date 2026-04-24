import type { Application } from 'express';
import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import App from './app/App.js';
import ApiGateway from './gateway/Gateway.router.js';
import AuthController from './modules/auth/controller/AuthController.js';
import AuthService from './modules/auth/service/AuthService.auth.js';
import Server from './server/Server.js';
import Logger from './logs/Logger.js';
import AuthRepository from './modules/auth/repository/AuthRepository.js';
import AuthRouter from './modules/auth/router/AuthRouter.js';
import AuthDB from './modules/auth/data-source.auth.js';
import OrderRepository from '@modules/order/repository/OrderRepository.js';
import OrderService from '@modules/order/service/OrderService.js';
import OrderController from '@modules/order/controller/OrderController.js';
import OrderRouter from '@modules/order/router/OrderRouter.js';
import { PATH } from '@utils/Path.js';
import OrderDB from '@modules/order/data-source.order.js';
import OrderHistoryRepository from '@modules/order/repository/OrderHistoryRepository.js';
import OrderHistoryService from '@modules/order/service/OrderHistoryService.js';
import CheckoutRepository from '@modules/checkout/repository/CheckoutRepository.js';
import CheckoutService from '@modules/checkout/service/CheckoutService.js';
import OrderQueryLocal from '@modules/domain/order/adapter/OrderQueryLocal.js';
import CheckoutController from '@modules/checkout/controller/CheckoutController.js';
import CheckoutRouter from '@modules/checkout/router/CheckoutRouter.js';
import Messaging from 'messaging/Messaging.js';

const appPort = process.env.SERVER_PORT || 3000;

// Logs
const logger: Logger = new Logger();

// Database
const authDB = new AuthDB();
const orderDB = new OrderDB();
const messaging = new Messaging();
await messaging.init();

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
    messaging,
);
const orderController = new OrderController(orderService);
const orderRouter = new OrderRouter(orderController);
orderService.listenPaymentEvents();

// Module - CHECKOUT
const checkoutRepository = new CheckoutRepository();
const checkoutOrderQuery = new OrderQueryLocal(orderRepository);
const checkoutService = new CheckoutService(
    checkoutRepository,
    checkoutOrderQuery,
    messaging,
);
const checkoutController = new CheckoutController(checkoutService);
const checkoutRouter = new CheckoutRouter(checkoutController);

// GATEWAY
const gateway = new ApiGateway(PATH.GATEWAY);
gateway.addRoute(PATH.AUTH.BASE, authRouter.getRouter());
gateway.addRoute(PATH.ORDER.BASE, orderRouter.getRouter());
gateway.addRoute(PATH.CHECKOUT.BASE, checkoutRouter.getRouter());

// gateway.addRoute('/users', userRouter.getRouter());
const exp: Application = express();
const server = new Server(exp);
const app = new App(appPort, server, gateway);

//Bootstrap
app.init();
