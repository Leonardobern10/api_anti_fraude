import type InterfaceCheckoutController from '@modules/domain/checkout/InterfaceCheckoutController';
import type { Request, Response } from 'express';
import type InterfaceCheckoutService from '@modules/domain/checkout/InterfaceCheckoutService';
import CheckoutDTO from '@modules/domain/checkout/dto/CheckoutDTO';
import { HttpStatus } from '@utils/HttpStatus.utils';
import BuildResponseError from '@utils/BuildResponseError';
import { CheckoutSchema } from '../model/schema/CheckoutSchema';
import BadRequestError from '@errors/BadRequestError';
import InfoMethodFactory from '../model/InfoMethodFactory';

export default class CheckoutController implements InterfaceCheckoutController {
    private service: InterfaceCheckoutService;

    constructor(service: InterfaceCheckoutService) {
        this.service = service;
    }

    async payment(req: Request, res: Response): Promise<void> {
        try {
            const { orderId } = req.params;
            const userEmail = (req as any).user.email;

            if (!orderId) {
                throw new BadRequestError('OrderId is required.');
            }

            const parsed = CheckoutSchema.safeParse(req.body);

            if (!parsed.success) {
                throw new BadRequestError('Invalid payment payload.');
            }

            const infoPay = parsed.data;

            const userAgent = req.headers['user-agent'];
            if (!userAgent) {
                throw new BadRequestError('User-Agent header is required.');
            }

            const ipAddress = req.ip ?? 'unknown';

            // 🔥 Conversão DTO primitivo → Value Object de domínio
            const infoMethod = InfoMethodFactory.create(infoPay);

            const checkoutDTO = new CheckoutDTO(
                orderId.toString()!,
                userEmail,
                infoPay.paymentMethod,
                infoMethod,
                infoPay.currency,
                ipAddress,
                userAgent,
                new Date().toISOString(),
            );

            const payment = await this.service.pay(checkoutDTO);

            res.status(HttpStatus.OK).json({ payment });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }
}
