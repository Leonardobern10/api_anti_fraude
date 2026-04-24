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
            // Extração de dados primitivos da requisição
            const { orderId } = req.params;
            const userEmail = (req as any).user.email;

            // Verifica se o id do pedido foi fornecido
            if (!orderId) {
                throw new BadRequestError('OrderId is required.');
            }

            // Validação do payload de pagamento usando Zod
            const parsed = CheckoutSchema.safeParse(req.body);

            // Se a validação falhar, lança um erro de requisição inválida
            if (!parsed.success) {
                throw new BadRequestError('Invalid payment payload.');
            }

            // Extração dos dados validados para o processamento do pagamento
            const infoPay = parsed.data;

            // Extração do User-Agent e IP Address da requisição
            const userAgent = req.headers['user-agent'];
            if (!userAgent) {
                throw new BadRequestError('User-Agent header is required.');
            }

            const ipAddress = req.ip ?? 'unknown';

            // Conversão DTO primitivo → Value Object de domínio
            const infoMethod = InfoMethodFactory.create(infoPay);

            // Conversão DTO primitivo → DTO de domínio
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

            // Processamento do pagamento
            const payment = await this.service.pay(checkoutDTO);

            res.status(HttpStatus.OK).json({ payment });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }
}
