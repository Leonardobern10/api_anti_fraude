import type InterfaceOrderController from '@modules/domain/order/InterfaceOrderController';
import type { Request, Response } from 'express';
import { HttpStatus } from '@utils/HttpStatus.utils';
import type InterfaceOrderService from '@modules/domain/order/InterfaceOrderService';
import BuildResponseError from '@utils/BuildResponseError';
import { OrderSchema } from '../model/schema/OrderSchema';
import HttpError from '@errors/HttpError';
import { MSG } from '@utils/MessageResponse';

export default class OrderController implements InterfaceOrderController {
    private service: InterfaceOrderService;

    constructor(service: InterfaceOrderService) {
        this.service = service;
    }

    /**
     * @swagger
     * /orders/{id}:
     *   get:
     *     summary: Buscar pedido por ID
     *     tags: [Orders]
     *     security:
     *       - cookieAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: c900bc3b-a1f7-4dfb-b074-066b3f6b1950
     *     responses:
     *       200:
     *         description: Pedido encontrado
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 order:
     *                   $ref: '#/components/schemas/OrderResponse'
     *       400:
     *         description: ID inválido
     *       404:
     *         description: Pedido não encontrado
     */
    async getOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = (req as any).user.email;
            if (!id || typeof id !== 'string')
                throw new HttpError(
                    MSG.ORDER.ERROR.INVALID_ID,
                    HttpStatus.BAD_REQUEST,
                );
            const order = await this.service.getOrder(id, user);
            res.status(HttpStatus.OK).json({ order });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }

    /**
     * @swagger
     * /orders:
     *   post:
     *     summary: Criar um novo pedido
     *     tags: [Orders]
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
     *         description: Pedido criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: string
     *                 order:
     *                   $ref: '#/components/schemas/OrderResponse'
     *       400:
     *         description: Dados inválidos
     */
    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const { value } = req.body;
            const user = this.getUser(req);
            OrderSchema.parse({ email: user, value });
            const newOrder = await this.service.createOrder(user, value);
            res.status(HttpStatus.CREATED).json({
                success: MSG.ORDER.SUCCESS.CREATED,
                order: newOrder,
            });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }

    /**
     * @swagger
     * /orders/{id}/cancel:
     *   patch:
     *     summary: Cancelar um pedido
     *     tags: [Orders]
     *     security:
     *       - cookieAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *         example: c900bc3b-a1f7-4dfb-b074-066b3f6b1950
     *     responses:
     *       200:
     *         description: Pedido cancelado com sucesso
     *       400:
     *         description: ID inválido
     *       403:
     *         description: Operação não autorizada
     */
    async cancelOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = this.getUser(req);
            if (!id || typeof id !== 'string')
                throw new HttpError(
                    MSG.ORDER.ERROR.INVALID_ID,
                    HttpStatus.BAD_REQUEST,
                );
            await this.service.cancelOrder(id, user);
            res.status(HttpStatus.OK).json({
                message: MSG.ORDER.SUCCESS.CANCELLED,
            });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }

    //  Será atualizado pelo Payment
    async updateOrder(req: Request, res: Response): Promise<void> {}

    private getUser(req: Request): string {
        return (req as any).user.email;
    }
}
