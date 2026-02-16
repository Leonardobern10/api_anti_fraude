import UserNotFoundError from '../../../errors/UserNotFoundError';
import Logger from '../../../logs/Logger';
import Crypt from '../../../utils/Crypt';
import { HttpStatus } from '../../../utils/HttpStatus.utils';
import JwtUtils from '../../../utils/JWT.utils';
import type InterfaceAuthService from '../../domain/auth/InterfaceAuthService';
import Client from '../model/entity/Client';
import type AuthRepository from '../repository/AuthRepository';

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
            const msg = 'User always was registered.';
            this.logger.error('create user', msg);
            throw new UserNotFoundError(msg, HttpStatus.NOT_FOUND);
        }
        const registered = await this.repository.save(name, email, password);
        this.logger.info('User created with successful.');
        return registered;
    }
    async login(email: string, password: string): Promise<string> {
        const user = await this.findUser(email);
        if (!user) throw new UserNotFoundError('User not registered', 404);
        const isValidPassword = await Crypt.compare(password, user.password);
        if (!isValidPassword)
            throw new Error('Invalid credentials', { cause: 400 });
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
