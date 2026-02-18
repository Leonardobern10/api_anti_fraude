import type InterfaceOrderRepository from '@modules/domain/order/InterfaceOrderRepository';
import Order from '../model/entity/Order';
import { OrderStatus } from '../model/OrderStatus';
import type { ClientType } from '@modules/domain/types/ClientType';
import type { Repository } from 'typeorm';
import type OrderDB from '../data-source.order';
import type InterfaceModuleDB from '@modules/domain/ModuleDB';
import type OrderHistory from '../model/entity/OrderHistory';
import { MSG } from '@utils/MessageResponse';
import { HttpStatus } from '@utils/HttpStatus.utils';

// Teste
const client1: ClientType = {
    idUser: 'u1',
    name: 'Leonardo Silva',
    email: 'leonardo.silva@example.com',
    password: 'hashed_password_123',
    role: 'admin',
    createdAt: new Date('2026-01-10T10:00:00Z'),
    updatedAt: new Date('2026-01-10T10:00:00Z'),
};

const client2: ClientType = {
    idUser: 'u2',
    name: 'Mariana Costa',
    email: 'mariana.costa@example.com',
    password: 'hashed_password_456',
    role: 'user',
    createdAt: new Date('2026-01-12T14:30:00Z'),
    updatedAt: new Date('2026-01-15T09:20:00Z'),
};

const client3: ClientType = {
    idUser: 'u3',
    name: 'Carlos Souza',
    email: 'carlos.souza@example.com',
    password: 'hashed_password_789',
    role: 'user',
    createdAt: new Date('2026-01-20T08:45:00Z'),
    updatedAt: new Date('2026-02-01T16:10:00Z'),
};

export default class OrderRepository implements InterfaceOrderRepository {
    private orderDB: OrderDB;
    private repo!: Repository<Order>;
    private users: Array<ClientType>;

    constructor(orderDB: OrderDB) {
        this.orderDB = orderDB;
        this.users = [client1, client2, client3];
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
        const userTest = this.users.find((el) => el.email === user);
        if (!userTest)
            throw new Error(MSG.AUTH.ERROR.NOT_FOUND, {
                cause: HttpStatus.NOT_FOUND,
            });
        const order = this.repo.create({ user, value });
        const orderCreated = this.repo.save(order);
        return orderCreated;
    }

    async get(id: string): Promise<Order> {
        const order = await this.repo.findOne({
            where: { id: id },
            relations: { orderHistory: true },
        });
        if (!order)
            throw new Error(MSG.ORDER.ERROR.NOT_FOUND, {
                cause: HttpStatus.NOT_FOUND,
            });
        return order;
    }

    async update(
        id: string,
        newStatus: OrderStatus,
        statusPast: OrderHistory,
    ): Promise<Order> {
        const order = await this.repo.findOne({
            where: { id },
            relations: { orderHistory: true },
        });

        if (!order) {
            throw new Error(MSG.ORDER.ERROR.NOT_FOUND, {
                cause: HttpStatus.NOT_FOUND,
            });
        }

        if (order.orderStatus === OrderStatus.CANCELLED)
            throw new Error(MSG.ORDER.ERROR.UNAUTHORIZED, { cause: 403 });

        order.orderHistory.push(statusPast);
        order.orderStatus = newStatus;
        return await this.repo.save(order);
    }

    // Remover
    async getUser(email: string): Promise<ClientType> {
        const user = this.users.find((el) => el.email === email);
        if (!user) throw new Error('User not found', { cause: 404 });
        return user;
    }
}
