import type { Repository } from 'typeorm';
import type Client from '../model/entity/Client';
import AuthDB from '../data-source.auth';

export default class AuthRepository {
    private authDB: AuthDB;
    private repo!: Repository<Client>;

    constructor(authDB: AuthDB) {
        this.authDB = authDB;
        this.init();
    }

    private async init() {
        try {
            await this.authDB.init();
            this.repo = this.authDB.getRepository();
            if (!this.repo)
                throw new Error('Was not possible to get Repository');
        } catch (error) {
            console.error('Error on Repository', error);
        }
    }

    public test(): string {
        return 'Até o repository!';
    }

    public async getUser(email: string): Promise<Client | null> {
        const user = await this.repo.findOne({
            where: { email: email },
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
