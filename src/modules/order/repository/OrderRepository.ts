import type InterfaceOrderRepository from '@modules/domain/order/InterfaceOrderRepository';
import Order from '../model/entity/Order';
import { OrderStatus } from '../model/OrderStatus';
import type { Repository } from 'typeorm';
import type OrderDB from '../data-source.order';
import type OrderHistory from '../model/entity/OrderHistory';

export default class OrderRepository implements InterfaceOrderRepository {
    private orderDB: OrderDB;
    private repo!: Repository<Order>;

    constructor(orderDB: OrderDB) {
        this.orderDB = orderDB;
        this.init();
    }

    private async init() {
        try {
            await this.orderDB.init();
            this.repo = this.orderDB.getOrderRepository();
            if (!this.repo)
                throw new Error('Was not possible to get Repository', {
                    cause: 500,
                });
        } catch (error) {
            console.error('Error on Repository', error);
        }
    }

    async save(user: string, value: number): Promise<Order> {
        const order = this.repo.create({ user, value });
        const orderCreated = this.repo.save(order);
        return orderCreated;
    }

    async get(id: string): Promise<Order | null> {
        const order = await this.repo.findOne({
            where: { id: id },
            relations: { orderHistory: true },
        });
        return order;
    }

    async update(
        id: string,
        newStatus: OrderStatus,
        statusPast: OrderHistory,
    ): Promise<Order> {
        const order = await this.repo.findOne({
            where: { id: id },
            relations: { orderHistory: true },
        });
        order!.orderHistory.push(statusPast);
        order!.orderStatus = newStatus;
        return await this.repo.save(order!);
    }
}
