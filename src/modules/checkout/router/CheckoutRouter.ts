import AuthMiddleWare from '@gateway/middlewares/AuthMiddleware';
import type InterfaceCheckoutController from '@modules/domain/checkout/InterfaceCheckoutController';
import { Router } from 'express';
import type { Request, Response } from 'express';

export default class CheckoutRouter {
    private controller: InterfaceCheckoutController;
    private router: Router;

    constructor(controller: InterfaceCheckoutController) {
        this.controller = controller;
        this.router = Router();
    }

    public getRouter(): Router {
        return this.router;
    }

    public checkout() {
        this.router.post(
            '/',
            AuthMiddleWare.checkAuthentication,
            async (req: Request, res: Response) => {
                this.controller.payment(req, res);
            },
        );
    }
}
