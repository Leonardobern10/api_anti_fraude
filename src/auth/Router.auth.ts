import type { Router, Request, Response } from 'express';
import type ControllerAuth from './Controller.auth';

export default class RouterAuth {
    private controller: ControllerAuth;
    private router: Router;

    constructor(router: Router, controller: ControllerAuth) {
        this.router = router;
        this.controller = controller;
        this.registerRoutes();
    }

    public getUser() {
        this.router.get('/', async (req: Request, res: Response) => {
            this.controller.getUser(req, res);
        });
    }

    private registerRoutes() {
        this.getUser();
    }

    public getRouter() {
        return this.router;
    }
}
