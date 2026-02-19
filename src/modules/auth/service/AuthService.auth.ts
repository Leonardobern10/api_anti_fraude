import UserNotFoundError from '@errors/UserNotFoundError';
import type Logger from '@logs/Logger';
import Crypt from '@utils/Crypt';
import { HttpStatus } from '@utils/HttpStatus.utils';
import JwtUtils from '@utils/JWT.utils';
import type InterfaceAuthService from '../../domain/auth/InterfaceAuthService';
import Client from '../model/entity/Client';
import type AuthRepository from '../repository/AuthRepository';
import { MSG } from '@utils/MessageResponse';

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
            throw new UserNotFoundError(
                MSG.AUTH.ERROR.BAD_REQUEST.USER,
                HttpStatus.NOT_FOUND,
            );
        }
        const registered = await this.repository.save(name, email, password);
        this.logger.info(MSG.AUTH.SUCCESS.CREATED);
        return registered;
    }
    async login(email: string, password: string): Promise<string> {
        const user = await this.findUser(email);
        if (!user)
            throw new UserNotFoundError(
                MSG.AUTH.ERROR.NOT_FOUND,
                HttpStatus.NOT_FOUND,
            );
        const isValidPassword = await Crypt.compare(password, user.password);
        if (!isValidPassword)
            throw new Error(MSG.AUTH.ERROR.BAD_REQUEST.CREDENTIALS, {
                cause: HttpStatus.BAD_REQUEST,
            });
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

    validateToken(token: string) {
        return JwtUtils.verify(token);
    }

    public getUser(): string {
        return this.repository.test();
    }
}
