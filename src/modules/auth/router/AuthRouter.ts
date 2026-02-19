import type { Router, Request, Response } from 'express';
import express from 'express';
import type AuthController from '../controller/AuthController';
import AuthMiddleWare from '../../../gateway/middlewares/AuthMiddleware';
import { PATH } from '@utils/Path';

export default class AuthRouter {
    private controller: AuthController;
    private router: Router;

    constructor(controller: AuthController) {
        this.router = express.Router();
        this.controller = controller;
        this.registerRoutes();
    }

    public createUser() {
        this.router.post(
            PATH.AUTH.REGISTER,
            async (req: Request, res: Response) => {
                this.controller.register(req, res);
            },
        );
    }

    public getUser() {
        this.router.get(
            PATH.AUTH.GET,
            AuthMiddleWare.checkAuthentication,
            async (req: Request, res: Response) => {
                this.controller.getUser(req, res);
            },
        );
    }

    public getRouter() {
        return this.router;
    }

    public login() {
        this.router.post(PATH.AUTH.LOGIN, async (req, res) => {
            this.controller.login(req, res);
        });
    }

    public authStatus() {
        this.router.get(
            PATH.AUTH.AUTH_STATUS,
            AuthMiddleWare.checkAuthentication,
            async (req, res) => {
                this.controller.authStatus(req, res);
            },
        );
    }

    public logout() {
        this.router.post(
            PATH.AUTH.LOGOUT,
            AuthMiddleWare.checkAuthentication,
            (req, res) => {
                this.controller.logout(req, res);
            },
        );
    }

    private registerRoutes() {
        this.createUser();
        this.getUser();
        this.login();
        this.authStatus();
        this.logout();
    }
}
