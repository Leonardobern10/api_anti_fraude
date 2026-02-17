import type { Router, Request, Response } from 'express';
import express from 'express';
import type AuthController from '../controller/AuthController';
import AuthMiddleWare from '../middlewares/AuthMiddleware';

export default class AuthRouter {
    private controller: AuthController;
    private router: Router;

    constructor(controller: AuthController) {
        this.router = express.Router();
        this.controller = controller;
        this.registerRoutes();
    }

    public createUser() {
        this.router.post('/register', async (req: Request, res: Response) => {
            this.controller.register(req, res);
        });
    }

    public getUser() {
        this.router.get(
            '/user',
            AuthMiddleWare.checkAuthentication,
            async (req: Request, res: Response) => {
                this.controller.getUser(req, res);
            },
        );
    }

    public test() {
        this.router.get('/test', async (req: Request, res: Response) => {
            this.controller.test(req, res);
        });
    }

    public getRouter() {
        return this.router;
    }

    public login() {
        this.router.post('/login', async (req, res) => {
            this.controller.login(req, res);
        });
    }

    public authStatus() {
        this.router.get(
            '/authStatus',
            AuthMiddleWare.checkAuthentication,
            async (req, res) => {
                this.controller.authStatus(req, res);
            },
        );
    }

    public logout() {
        this.router.post(
            '/logout',
            AuthMiddleWare.checkAuthentication,
            (req, res) => {
                this.controller.logout(req, res);
            },
        );
    }

    private registerRoutes() {
        this.test();
        this.createUser();
        this.getUser();
        this.login();
        this.authStatus();
        this.logout();
    }
}
