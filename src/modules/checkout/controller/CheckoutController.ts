import type { Request, Response } from 'express';
import type InterfaceCheckoutController from '@modules/domain/checkout/InterfaceCheckoutController.js';
import type InterfaceCheckoutService from '@modules/domain/checkout/InterfaceCheckoutService.js';
import CheckoutDTO from '@modules/domain/checkout/dto/CheckoutDTO.js';
import { HttpStatus } from '@utils/HttpStatus.utils.js';
import BuildResponseError from '@utils/BuildResponseError.js';
import { CheckoutSchema } from '../model/schema/CheckoutSchema.js';
import BadRequestError from '@errors/BadRequestError.js';
import InfoMethodFactory from '../model/InfoMethodFactory.js';

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
