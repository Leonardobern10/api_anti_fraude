import type User from '../../auth/User';

export default interface InterfaceAuthService {
    register(name: string, email: string, password: string): User;
    login(email: string, password: string): boolean;
    findUser(email: string): User;
    resetPassword(email: string, newPassword: string): boolean;
}
