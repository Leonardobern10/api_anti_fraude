import type InterfaceOrderController from '@modules/domain/order/InterfaceOrderController';
import type { Request, Response } from 'express';
import Order from '../model/entity/Order';
import { HttpStatus } from '@utils/HttpStatus.utils';
import type InterfaceOrderService from '@modules/domain/order/InterfaceOrderService';
import { OrderStatus } from '../model/OrderStatus';
import OrderHistory from '../model/entity/OrderHistory';
import BuildResponseError from '@utils/BuildResponseError';
import { OrderSchema } from '../model/schema/OrderSchema';
import z from 'zod';
import HttpError from '@errors/HttpError';

export default class OrderController implements InterfaceOrderController {
    private service: InterfaceOrderService;

    constructor(repository: InterfaceOrderService) {
        this.service = repository;
    }

    async getOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (typeof id !== 'string') throw new HttpError('Invalid ID', 400);
            const order = await this.service.getOrder(id);
            res.status(HttpStatus.OK).json({ order });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }

    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const { email, value } = req.body;
            OrderSchema.parse({ email, value });
            const newOrder = await this.service.createOrder(email, value);
            res.status(HttpStatus.CREATED).json({
                success: 'Order created with successfull.',
                order: newOrder,
            });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }

    async cancelOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string')
                throw new HttpError('Invalid ID.', 400);
            await this.service.atualizarStatus(id, OrderStatus.CANCELLED);
            res.status(200).json({ message: 'Order cancelled with success.' });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }

    async updateOrder(req: Request, res: Response): Promise<void> {}
}
