import type Payment from '@modules/checkout/model/Payment';
import type { Request, Response } from 'express';

export default interface InterfaceCheckoutController {
    payment(req: Request, res: Response): Payment;
}
