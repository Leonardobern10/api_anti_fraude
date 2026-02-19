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
