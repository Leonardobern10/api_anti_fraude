import { DataSource, Repository } from 'typeorm';
import Client from './model/entity/Client';

export default class AuthDB {
    private datasource: DataSource;

    constructor() {
        this.datasource = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '1234',
            database: 'app_anti_fraude',
            synchronize: true,
            logging: true,
            entities: [Client],
            subscribers: [],
            migrations: [],
        });
    }

    public async init(): Promise<void> {
        try {
            await this.datasource.initialize();
            console.log('Data Source initialized with sucessfull');
        } catch (error) {
            console.error('Error on initialization Data Source', error);
        }
    }

    public getRepository(): Repository<Client> {
        return this.datasource.getRepository(Client);
    }
}
