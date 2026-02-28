import type InterfaceCheckoutController from '@modules/domain/checkout/InterfaceCheckoutController';
import type { Request, Response } from 'express';
import type Payment from '../model/Payment';
import type InterfaceCheckoutService from '@modules/domain/checkout/InterfaceCheckoutService';

export default class CheckoutController implements InterfaceCheckoutController {
    private service: InterfaceCheckoutService;

    constructor(service: InterfaceCheckoutService) {
        this.service = service;
    }

    payment(req: Request, res: Response): Payment {
        throw new Error('Method not implemented.');
    }
}
