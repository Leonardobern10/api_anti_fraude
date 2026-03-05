import AuthMiddleWare from '@gateway/middlewares/AuthMiddleware';
import type InterfaceCheckoutController from '@modules/domain/checkout/InterfaceCheckoutController';
import express from 'express';
import type { Request, Response, Router } from 'express';

export default class CheckoutRouter {
    private controller: InterfaceCheckoutController;
    private router: Router;

    constructor(controller: InterfaceCheckoutController) {
        this.controller = controller;
        this.router = express.Router();
        this.registerRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private registerRoutes() {
        this.checkout();
    }

    public async checkout() {
        this.router.post(
            '/:orderId',
            AuthMiddleWare.checkAuthentication,
            async (req: Request, res: Response) => {
                await this.controller.payment(req, res);
            },
        );
    }
}
