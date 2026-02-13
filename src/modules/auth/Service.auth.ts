import type InterfaceAuthService from '../domain/auth/InterfaceAuthService';
import type AuthRepository from './Repository.auth';
import User from './User';

export default class AuthService implements InterfaceAuthService {
    private repository: AuthRepository;

    constructor(repository: AuthRepository) {
        this.repository = repository;
    }
    register(name: string, email: string, password: string): User {
        const newUser: User = new User(name, email, password);
        return this.repository.save(newUser);
    }
    login(email: string, password: string): boolean {
        throw new Error('Method not implemented.');
    }
    findUser(email: string): User {
        const user = this.repository.getUser(email);
        if (!user) throw new Error('User is not found');
        return user;
    }
    resetPassword(email: string, newPassword: string): boolean {
        throw new Error('Method not implemented.');
    }

    public getUser(): string {
        return this.repository.test();
    }
}
