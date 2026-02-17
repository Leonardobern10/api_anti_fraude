import type { Request, Response } from 'express';

export default interface InterfaceOrderController {
    getOrder(req: Request, res: Response): Promise<void>;
    createOrder(req: Request, res: Response): Promise<void>;
    cancelOrder(req: Request, res: Response): Promise<void>;
    updateOrder(req: Request, res: Response): Promise<void>;
}
