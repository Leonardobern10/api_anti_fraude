import UserNotFoundError from '../../errors/UserNotFoundError';
import Logger from '../../logs/Logger';
import { HttpStatus } from '../../utils/HttpStatus.utils';
import type InterfaceAuthService from '../domain/auth/InterfaceAuthService';
import type AuthRepository from './Repository.auth';
import User from './User';

export default class AuthService implements InterfaceAuthService {
    private repository: AuthRepository;
    private logger: Logger;

    constructor(repository: AuthRepository, logger: Logger) {
        this.repository = repository;
        this.logger = logger;
    }
    register(name: string, email: string, password: string): User {
        this.logger.info(`Email searched: ${email}`);
        const user: User | null = this.findUser(email);
        if (user) {
            const msg = 'User always was registered.';
            this.logger.error('create user', msg);
            throw new UserNotFoundError(msg, HttpStatus.NOT_FOUND);
        }
        const registered = this.repository.save(
            new User(name, email, password),
        );
        this.logger.info('User created with successful.');
        return registered;
    }
    login(email: string, password: string): boolean {
        // if (!user) throw new Error('User is not found');
        throw new Error('Method not implemented.');
    }
    findUser(email: string): User | null {
        const user = this.repository.getUser(email);
        return user;
    }
    resetPassword(email: string, newPassword: string): boolean {
        throw new Error('Method not implemented.');
    }

    public getUser(): string {
        return this.repository.test();
    }
}
