import { DataSource, Repository } from 'typeorm';
import Client from './model/entity/Client';
import type InterfaceModuleDB from '@modules/domain/ModuleDB';

export default class AuthDB implements InterfaceModuleDB {
    private datasource: DataSource;

    constructor() {
        this.datasource = new DataSource({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USERNAME!,
            password: process.env.DB_PASSWORD!,
            database: process.env.DB_AUTH_NAME!,
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
