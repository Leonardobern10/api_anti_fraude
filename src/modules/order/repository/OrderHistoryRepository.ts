import type { Repository } from 'typeorm';
import type OrderDB from '../data-source.order';
import type Order from '../model/entity/Order';
import type OrderHistory from '../model/entity/OrderHistory';
import type InterfaceOrderHistoryRepository from '@modules/domain/order/InterfaceOrderHistoryRepository';
import { OrderStatus } from '../model/OrderStatus';

export default class OrderHistoryRepository implements InterfaceOrderHistoryRepository {
    private orderDB: OrderDB;
    private repo!: Repository<OrderHistory>;

    constructor(orderDB: OrderDB) {
        this.orderDB = orderDB;
        this.repo = this.orderDB.getOrderHistoryRepository();
    }
    async save(order: Order, status: OrderStatus): Promise<OrderHistory> {
        const history = await this.repo.create({
            order: order,
            currentStatus: status,
        });
        const newHistory = await this.repo.save(history);
        return newHistory;
    }
    async getByID(id: string): Promise<OrderHistory | null> {
        return await this.repo.findOne({ where: { id: id } });
    }
    async getByStatus(status: OrderStatus): Promise<[OrderHistory[], number]> {
        return await this.repo.findAndCount({
            where: { currentStatus: status },
        });
    }
    async getByDate(updatedAt: Date): Promise<[OrderHistory[], number]> {
        return await this.repo.findAndCount({
            where: { updatedAt: updatedAt },
        });
    }
    async getByOrder(order: Order): Promise<[OrderHistory[], number]> {
        return await this.repo.findAndCount({ where: { order: order } });
    }
}
