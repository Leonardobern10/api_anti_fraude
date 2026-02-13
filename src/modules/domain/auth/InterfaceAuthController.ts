import type { Request, Response } from 'express';

export default interface InterfaceAuthController {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    logout(req: Request, res: Response): Promise<void>;
    reset(req: Request, res: Response): Promise<void>;
    authStatus(req: Request, res: Response): Promise<void>;
}
