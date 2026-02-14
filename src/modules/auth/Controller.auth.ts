import type { Request, Response } from 'express';
import type AuthService from './Service.auth';
import type InterfaceAuthController from '../domain/auth/InterfaceAuthController';
import { HttpStatus } from '../../utils/HttpStatus.utils';
import { UserSchema } from '../auth/model/UserSchema';
import BuildResponseError from '../../utils/BuildResponseError';
import User from './model/User';

export default class AuthController implements InterfaceAuthController {
    private service: AuthService;

    constructor(service: AuthService) {
        this.service = service;
    }
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;
            UserSchema.parse({ name, email, password });
            const user: User = this.service.register(name, email, password);
            res.status(HttpStatus.CREATED).json({ data: user });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }
    login(req: Request, res: Response): Promise<void> {
        throw new Error('Method not implemented.');
    }
    logout(req: Request, res: Response): Promise<void> {
        throw new Error('Method not implemented.');
    }
    reset(req: Request, res: Response): Promise<void> {
        throw new Error('Method not implemented.');
    }
    authStatus(req: Request, res: Response): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async getUser(req: Request, res: Response): Promise<void> {
        console.log('Chamou get user');
        const { email } = req.query;
        if (!email) {
            res.status(HttpStatus.BAD_REQUEST).json({
                error: 'Email not informed',
            });
            return;
        } else {
            res.status(HttpStatus.OK).json({
                data: this.service.findUser(email.toString()),
            });
        }
    }

    public test(req: Request, res: Response) {
        return res.status(200).json({ message: this.service.getUser() });
    }
}
