import type Client from '../../auth/model/entity/Client.js';

export default interface InterfaceAuthService {
    register(name: string, email: string, password: string): Promise<Client>;
    login(email: string, password: string): Promise<string>;
    findUser(email: string): Promise<Client | null>;
    resetPassword(email: string, newPassword: string): boolean;
}
