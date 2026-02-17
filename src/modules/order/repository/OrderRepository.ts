import type InterfaceOrderRepository from '@modules/domain/order/InterfaceOrderRepository';
import Order from '../model/entity/Order';
import type { OrderStatus } from '../model/OrderStatus';
import type { ClientType } from '@modules/domain/types/ClientType';

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
    private db: Array<Order>;
    private users: Array<ClientType>;

    constructor() {
        this.db = [];
        this.users = [client1, client2, client3];
    }

    async save(newOrder: Order): Promise<Order> {
        this.db.push(newOrder);
        return newOrder;
    }

    async delete(id: string): Promise<boolean> {
        try {
            const order = this.db.find((el) => el.getId() === id);
            if (!order) throw new Error('Order not found.');
            const newArray = this.db.filter(
                (el) => el.getId() !== order.getId(),
            );
            this.db = newArray;
            return true;
        } catch (error) {
            console.error('Error on delete order: ', error);
            return false;
        }
    }

    async get(id: string): Promise<Order> {
        const order = this.db.find((el) => el.getId() === id);
        if (!order) throw new Error('Order not found.');
        return order;
    }

    async update(id: string, newStatus: OrderStatus): Promise<Order> {
        const order = this.db.find((el) => el.getId() === id);
        if (!order) throw new Error('Order not found.');
        order.setOrderStatus(newStatus);
        order.setUpdatedAt(new Date());
        return order;
    }

    // Remover
    async getUser(email: string): Promise<ClientType> {
        const user = this.users.find((el) => el.email === email);
        if (!user) throw new Error('User not found', { cause: 404 });
        return user;
    }
}
