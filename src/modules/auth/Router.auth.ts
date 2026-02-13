import type { Router, Request, Response } from 'express';
import type ControllerAuth from './Controller.auth';
import express from 'express';

export default class AuthRouter {
    private controller: ControllerAuth;
    private router: Router;

    constructor(controller: ControllerAuth) {
        this.router = express.Router();
        this.controller = controller;
        this.registerRoutes();
    }

    public createUser() {
        this.router.post('/register', async (req: Request, res: Response) => {
            console.log('Chamou');
            this.controller.register(req, res);
        });
    }

    public getUser() {
        this.router.get('/user', async (req: Request, res: Response) => {
            this.controller.getUser(req, res);
        });
    }

    public test() {
        this.router.get('/test', async (req: Request, res: Response) => {
            this.controller.test(req, res);
        });
    }

    private registerRoutes() {
        this.test();
        this.createUser();
        this.getUser();
    }

    public getRouter() {
        return this.router;
    }
}
