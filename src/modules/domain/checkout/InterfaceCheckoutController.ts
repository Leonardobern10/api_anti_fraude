import type { Request, Response } from 'express';

export default interface InterfaceCheckoutController {
    payment(req: Request, res: Response): Promise<void>;
}
