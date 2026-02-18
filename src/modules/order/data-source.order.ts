import { DataSource, Repository } from 'typeorm';
import Order from './model/entity/Order';
import type InterfaceModuleDB from '@modules/domain/ModuleDB';
import OrderHistory from './model/entity/OrderHistory';

export default class OrderDB implements InterfaceModuleDB {
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
            entities: [Order, OrderHistory],
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

    public getOrderRepository(): Repository<Order> {
        return this.datasource.getRepository(Order);
    }

    public getOrderHistoryRepository(): Repository<OrderHistory> {
        return this.datasource.getRepository(OrderHistory);
    }
}
