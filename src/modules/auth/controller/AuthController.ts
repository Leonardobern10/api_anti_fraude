import type { Request, Response } from 'express';
import type AuthService from '../service/AuthService.auth';
import type InterfaceAuthController from '../../domain/auth/InterfaceAuthController';
import { HttpStatus } from '../../../utils/HttpStatus.utils';
import { RegisterSchema } from '../model/schema/RegisterSchema';
import BuildResponseError from '../../../utils/BuildResponseError';
import Client from '../model/entity/Client';
import Crypt from '../../../utils/Crypt';
import { MSG } from '@utils/MessageResponse';
import HttpError from '@errors/HttpError';
import { LoginSchema } from '../model/schema/LoginSchema';
import UnauthorizedError from '@errors/UnauthorizedError';
import NotFoundError from '@errors/NotFoundError';

export default class AuthController implements InterfaceAuthController {
    private service: AuthService;

    constructor(service: AuthService) {
        this.service = service;
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;
            RegisterSchema.parse({ name, email, password });
            const user: Client = await this.service.register(
                name,
                email,
                await Crypt.encrypt(password),
            );
            res.status(HttpStatus.CREATED).json({ data: user });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            LoginSchema.parse({ email, password });
            const token: string = await this.service.login(email, password);

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60,
            });

            res.status(HttpStatus.OK).json({ message: MSG.AUTH.SUCCESS.LOGIN });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }

    logout(req: Request, res: Response): void {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        res.status(200).json({ message: MSG.AUTH.SUCCESS.UNLOGGED });
    }

    reset(req: Request, res: Response): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async authStatus(req: Request, res: Response): Promise<void> {
        try {
            const token = req.cookies.token;
            if (!token)
                throw new UnauthorizedError(MSG.AUTH.ERROR.UNAUTHORIZED);
            const payload = this.service.validateToken(token);
            res.status(HttpStatus.OK).json({ payload });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }
    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.query;
            if (!email)
                throw new NotFoundError(MSG.AUTH.ERROR.BAD_REQUEST.EMAIL);
            const data = await this.service.findUser(email.toString());
            res.status(HttpStatus.OK).json({ data });
        } catch (error) {
            BuildResponseError.buildError(res, error);
        }
    }
}
