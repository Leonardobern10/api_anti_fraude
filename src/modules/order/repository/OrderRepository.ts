import type { Repository } from 'typeorm';
import type InterfaceOrderRepository from '@modules/domain/order/InterfaceOrderRepository.js';
import Order from '../model/entity/Order.js';
import { OrderStatus } from '../../domain/order/OrderStatus.js';
import type OrderDB from '../data-source.order.js';
import type OrderHistory from '../model/entity/OrderHistory.js';
import type { OrdersByUserResponse } from '../model/OrdersByUserResponse.js';
import NotFoundError from '@errors/NotFoundError.js';
import { MSG } from '@utils/MessageResponse.js';

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

    async getByUser(userId: string): Promise<OrdersByUserResponse | null> {
        const [orders, quantity]: [Order[], number] =
            await this.repo.findAndCount({
                where: { user: userId },
                relations: { orderHistory: true },
            });
        return { orders, quantity };
    }

    async update(id: string, newStatus: OrderStatus): Promise<Order> {
        const order = await this.repo.findOne({
            where: { id: id },
            relations: { orderHistory: true },
        });
        if (!order) throw new NotFoundError(MSG.ORDER.ERROR.NOT_FOUND);

        const updateOrder = await this.repo.update(
            { id: order.id },
            {
                orderStatus: newStatus,
            },
        );
        return updateOrder.raw;
    }
}
