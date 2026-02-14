import User from '../../auth/model/User';

export default interface InterfaceAuthRepository {
    test(): string;
    getUser(email: string): User | null;
    save(user: User): User;
}
