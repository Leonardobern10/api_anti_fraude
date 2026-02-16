import type { Repository } from 'typeorm';
import type Client from '../model/entity/Client';
import AuthDB from '../data-source.auth';

export default class AuthRepository {
    private authDB: AuthDB;
    private repo: Repository<Client>;

    constructor(authDB: AuthDB) {
        this.authDB = authDB;
        authDB.init();
        this.repo = authDB.getRepository();
    }

    public test(): string {
        return 'Até o repository!';
    }

    public async getUser(email: string): Promise<Client | null> {
        const user = await this.repo.findOne({
            where: {
                email: email,
            },
        });
        return user;
    }

    public async save(
        name: string,
        email: string,
        password: string,
    ): Promise<Client> {
        const user = await this.repo.create({
            name: name,
            email: email,
            password: password,
        });
        const newUser = await this.repo.save(user);
        return newUser;
    }
}
