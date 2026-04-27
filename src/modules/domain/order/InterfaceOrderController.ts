import type { Request, Response } from 'express';

export default interface InterfaceOrderController {
    getAll(req: Request, res: Response): Promise<void>;
    getOrder(req: Request, res: Response): Promise<void>;
    getOrdersByUser(req: Request, res: Response): Promise<void>;
    createOrder(req: Request, res: Response): Promise<void>;
    cancelOrder(req: Request, res: Response): Promise<void>;
    updateOrder(req: Request, res: Response): Promise<void>;
    getWithFilters(req: Request, res: Response): Promise<void>;
    getStats(req: Request, res: Response): Promise<void>;
}
