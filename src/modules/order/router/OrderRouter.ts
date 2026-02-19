import AuthMiddleWare from '@gateway/middlewares/AuthMiddleware';
import type InterfaceOrderController from '@modules/domain/order/InterfaceOrderController';
import type { Router, Request, Response } from 'express';
import express from 'express';

export default class OrderRouter {
    private controller: InterfaceOrderController;
    private router: Router;

    constructor(controller: InterfaceOrderController) {
        this.controller = controller;
        this.router = express.Router();
        this.regiterRoutes();
    }

    private regiterRoutes() {
        this.createOrder();
        this.getOrder();
        this.deleteOrder();
        this.updateOrder();
    }

    public createOrder() {
        this.router.post(
            '/',
            AuthMiddleWare.checkAuthentication,
            async (req: Request, res: Response) => {
                this.controller.createOrder(req, res);
            },
        );
    }

    public getOrder() {
        this.router.get(
            '/:id',
            AuthMiddleWare.checkAuthentication,
            async (req: Request, res: Response) => {
                this.controller.getOrder(req, res);
            },
        );
    }

    public deleteOrder() {
        this.router.delete(
            '/:id',
            AuthMiddleWare.checkAuthentication,
            async (req: Request, res: Response) => {
                this.controller.cancelOrder(req, res);
            },
        );
    }

    public updateOrder() {
        this.router.patch(
            '/:id',
            AuthMiddleWare.checkAuthentication,
            async (req: Request, res: Response) => {
                this.controller.updateOrder(req, res);
            },
        );
    }

    public getRouter(): Router {
        return this.router;
    }
}
