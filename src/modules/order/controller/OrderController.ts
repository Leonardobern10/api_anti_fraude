import type InterfaceOrderController from '@modules/domain/order/InterfaceOrderController';
import type { Request, Response } from 'express';
import { HttpStatus } from '@utils/HttpStatus.utils';
import type InterfaceOrderService from '@modules/domain/order/InterfaceOrderService';
import { OrderStatus } from '../model/OrderStatus';
import BuildResponseError from '@utils/BuildResponseError';
import { OrderSchema } from '../model/schema/OrderSchema';
import HttpError from '@errors/HttpError';
import { MSG } from '@utils/MessageResponse';

export default class OrderController implements InterfaceOrderController {
    private service: InterfaceOrderService;

    constructor(service: InterfaceOrderService) {
        this.service = service;
    }

    async getOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string')
                throw new HttpError(MSG.ORDER.ERROR.INVALID_ID, 400);
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
                success: MSG.ORDER.SUCCESS.CREATED,
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
                throw new HttpError(MSG.ORDER.ERROR.INVALID_ID, 400);
            await this.service.cancelOrder(id);
            res.status(200).json({ message: MSG.ORDER.SUCCESS.CANCELLED });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }

    //  Será atualizado pelo Payment
    async updateOrder(req: Request, res: Response): Promise<void> {}
}
