import type Logger from '@logs/Logger.js';
import Crypt from '@utils/Crypt.js';
import JwtUtils from '@utils/JWT.utils.js';
import type InterfaceAuthService from '../../domain/auth/InterfaceAuthService.js';
import Client from '../model/entity/Client.js';
import type AuthRepository from '../repository/AuthRepository.js';
import { MSG } from '@utils/MessageResponse.js';
import NotFoundError from '@errors/NotFoundError.js';
import BadRequestError from '@errors/BadRequestError.js';
import type { JwtPayload } from 'jsonwebtoken';

export default class AuthService implements InterfaceAuthService {
    private repository: AuthRepository;
    private logger: Logger;

    constructor(repository: AuthRepository, logger: Logger) {
        this.repository = repository;
        this.logger = logger;
    }

    async register(
        name: string,
        email: string,
        password: string,
    ): Promise<Client> {
        this.logger.info(`Email searched: ${email}`);
        const user: Client | null = await this.findUser(email);
        if (user) {
            this.logger.error('create user', MSG.AUTH.ERROR.BAD_REQUEST.USER);
            throw new NotFoundError(MSG.AUTH.ERROR.BAD_REQUEST.USER);
        }
        const registered = await this.repository.save(name, email, password);
        this.logger.info(MSG.AUTH.SUCCESS.CREATED);
        return registered;
    }
    async login(email: string, password: string): Promise<string> {
        const user = await this.findUser(email);
        if (!user) throw new NotFoundError(MSG.AUTH.ERROR.NOT_FOUND);
        const isValidPassword = await Crypt.compare(password, user.password);
        if (!isValidPassword)
            throw new BadRequestError(MSG.AUTH.ERROR.BAD_REQUEST.CREDENTIALS);
        const token = JwtUtils.generate(user);
        return token;
    }
    async findUser(email: string): Promise<Client | null> {
        const user = await this.repository.getUser(email);
        return user;
    }

    resetPassword(email: string, newPassword: string): boolean {
        throw new Error('Method not implemented.');
    }

    validateToken(token: string): String | JwtPayload {
        return JwtUtils.verify(token);
    }

    public getUser(): string {
        return this.repository.test();
    }
}
