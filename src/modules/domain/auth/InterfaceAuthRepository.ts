import type Client from '@modules/auth/model/entity/Client';

export default interface InterfaceAuthRepository {
    test(): string;
    getUser(email: string): Client | null;
    save(user: Client): Client;
}
