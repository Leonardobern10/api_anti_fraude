import type { Application } from 'express';
import express from 'express';
import Server from './server/Server';
import App from './app/App';
import ControllerAuth from './auth/Controller.auth';
import ServiceAuth from './auth/Service.auth';
import RepositoryAuth from './auth/Repository.auth';
import type User from './auth/User';
import RouterAuth from './auth/Router.auth';

const db: Array<User> = [];
const repository = new RepositoryAuth(db);
const service = new ServiceAuth(repository);
const controller = new ControllerAuth(service);
const router = new RouterAuth(express.Router(), controller);

const exp: Application = express();
const server = new Server(exp);
const app = new App('/auth', 3000, server);
app.registerRoutes(router.getRouter());
app.init();
