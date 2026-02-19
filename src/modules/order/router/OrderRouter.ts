import AuthMiddleWare from '@gateway/middlewares/AuthMiddleware';
import type InterfaceOrderController from '@modules/domain/order/InterfaceOrderController';
import type { Router, Request, Response } from 'express';
import express from 'express';

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestão de pedidos
 */
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

    /**
     * @swagger
     * /orders:
     *   post:
     *     tags: [Orders]
     *     summary: Criar novo pedido
     *     security:
     *       - cookieAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CreateOrderDTO'
     *     responses:
     *       201:
     *         description: Pedido criado
     */
    public createOrder() {
        this.router.post(
            '/',
            AuthMiddleWare.checkAuthentication,
            async (req: Request, res: Response) => {
                this.controller.createOrder(req, res);
            },
        );
    }

    /**
     * @swagger
     * /orders/{id}:
     *   get:
     *     tags: [Orders]
     *     summary: Buscar pedido por ID
     *     security:
     *       - cookieAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Pedido encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/OrderResponse'
     */
    public getOrder() {
        this.router.get(
            '/:id',
            AuthMiddleWare.checkAuthentication,
            async (req: Request, res: Response) => {
                this.controller.getOrder(req, res);
            },
        );
    }

    /**
     * @swagger
     * /orders/{id}:
     *   delete:
     *     tags: [Orders]
     *     summary: Cancelar pedido
     *     security:
     *       - cookieAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Pedido cancelado com sucesso
     */
    public deleteOrder() {
        this.router.delete(
            '/:id',
            AuthMiddleWare.checkAuthentication,
            async (req: Request, res: Response) => {
                this.controller.cancelOrder(req, res);
            },
        );
    }

    /**
     * @swagger
     * /orders/{id}:
     *   patch:
     *     tags: [Orders]
     *     summary: Atualizar status do pedido (Payment Service)
     *     security:
     *       - cookieAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Pedido atualizado
     */
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
