import { Between, type Repository } from 'typeorm';
import type InterfaceOrderRepository from '@modules/domain/order/InterfaceOrderRepository.js';
import Order from '../model/entity/Order.js';
import { OrderStatus } from '../../domain/order/OrderStatus.js';
import type OrderDB from '../data-source.order.js';
import type { OrdersByUserResponse } from '../model/OrdersByUserResponse.js';
import NotFoundError from '@errors/NotFoundError.js';
import { MSG } from '@utils/MessageResponse.js';
import type { OrderQueryDTO } from '../model/dto/OrderQueryDTO.js';
import type { CountStatsOrderResponse } from '../model/dto/CountStatsOrderResponse.js';
import type { PaymentMethod } from '@modules/checkout/model/infoMethods/PaymentMethod.js';

type AllOrdersResponse = {
    all: Order[];
    count: number;
};

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

    async getWithFilters(query: OrderQueryDTO): Promise<Order[]> {
        const qb = this.repo.createQueryBuilder('order');

        if (query.minValue) {
            qb.where('order.value > :minValue', { minValue: query.minValue });
        }

        if (query.maxValue) {
            qb.andWhere('order.value < :maxValue', {
                maxValue: query.maxValue,
            });
        }

        if (query.status) {
            qb.andWhere('order.orderStatus = :orderStatus', {
                orderStatus: query.status,
            });
        }

        if (query.user) {
            qb.andWhere('order.user = :user', { user: query.user });
        }

        if (query.sortBy) {
            qb.orderBy(`order.${query.sortBy}`, query.modeSort || 'ASC');
        }

        if (query.limit) {
            qb.limit(query.limit);
        } else {
            qb.limit(10);
        }

        if (query.page) {
            qb.skip(query.page * (query.limit || 10));
        }

        return qb.getMany();
    }

    async get(id: string): Promise<Order | null> {
        const order = await this.repo.findOne({
            where: { id: id },
            relations: { orderHistory: true },
        });
        return order;
    }

    async getAll(): Promise<AllOrdersResponse | null> {
        const [all, count] = await this.repo.findAndCount({
            relations: { orderHistory: true },
        });
        if (!all) return null;
        else return { all, count };
    }

    async getByUser(userId: string): Promise<OrdersByUserResponse | null> {
        const [orders, quantity]: [Order[], number] =
            await this.repo.findAndCount({
                where: { user: userId },
                relations: { orderHistory: true },
            });
        return { orders, quantity };
    }

    async update(
        id: string,
        newStatus: OrderStatus,
        paymentMethod: PaymentMethod,
    ): Promise<Order> {
        const order = await this.repo.findOne({
            where: { id: id },
            relations: { orderHistory: true },
        });
        if (!order) throw new NotFoundError(MSG.ORDER.ERROR.NOT_FOUND);

        const updateOrder = await this.repo.update(
            { id: order.id },
            {
                orderStatus: newStatus,
                payment: paymentMethod,
            },
        );
        return updateOrder.raw;
    }

    async getStats(): Promise<CountStatsOrderResponse> {
        try {
            const now = new Date();

            const startOfDay = new Date(now);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(now);
            endOfDay.setHours(23, 59, 59, 999);

            const [data, countData] = await this.repo.findAndCount();
            const countToday = await this.repo.countBy({
                createdAt: Between(startOfDay, endOfDay),
            });
            const countProcessed = await this.repo.countBy({
                orderStatus: OrderStatus.PAYMENT_PENDING,
            });
            const countAnalisys = await this.repo.countBy({
                orderStatus: OrderStatus.UNDER_REVIEW,
            });
            const countApproved = await this.repo.countBy({
                orderStatus: OrderStatus.APPROVED,
            });
            const countRejected = await this.repo.countBy({
                orderStatus: OrderStatus.REJECTED,
            });

            return {
                orders: data,
                all: countData,
                today: countToday,
                processed: countProcessed,
                analisys: countAnalisys,
                approved: countApproved,
                rejected: countRejected,
            };
        } catch (error) {
            throw new Error('Erro ao processar consulta');
        }
    }
}
