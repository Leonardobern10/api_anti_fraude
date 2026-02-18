import type InterfaceOrderService from '@modules/domain/order/InterfaceOrderService';
import Order from '../model/entity/Order';
import { OrderStatus } from '../model/OrderStatus';
import type InterfaceOrderRepository from '@modules/domain/order/InterfaceOrderRepository';
import type { ClientType } from '@modules/domain/types/ClientType';
import OrderHistory from '../model/entity/OrderHistory';
import { MSG } from '@utils/MessageResponse';

export default class OrderService implements InterfaceOrderService {
    private repository: InterfaceOrderRepository;

    constructor(repository: InterfaceOrderRepository) {
        this.repository = repository;
    }

    async registryHistory(
        order: Order,
        newStatus: OrderStatus,
    ): Promise<Order> {
        const orderHistory = new OrderHistory(
            order.getUpdatedAt(),
            order.getOrderStatus(),
        );
        order.getOrderHistory().push(orderHistory);
        order.setUpdatedAt(new Date());
        order.setOrderStatus(newStatus);
        return order;
    }

    verificarToken(token: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    getUserByEmail(email: string): Promise<ClientType> {
        return this.repository.getUser(email);
    }

    construirOrder(user: ClientType, value: number): Order {
        throw new Error('Method not implemented.');
    }

    async createOrder(email: string, value: number): Promise<Order> {
        const user = await this.repository.getUser(email);
        if (!user) throw new Error(MSG.AUTH.ERROR.NOT_FOUND, { cause: 404 });
        const newOrder = new Order(email, value);
        return await this.repository.save(newOrder);
    }

    async updateStatus(id: string, newStatus: OrderStatus): Promise<Order> {
        const order = await this.repository.get(id);
        if (!order) throw new Error(MSG.ORDER.ERROR.NOT_FOUND, { cause: 404 });
        const orderUpdated = this.registryHistory(order, newStatus);
        return orderUpdated;
    }

    async getOrder(id: string): Promise<Order> {
        const order = await this.repository.get(id);
        if (!order) throw new Error(MSG.ORDER.ERROR.NOT_FOUND, { cause: 404 });
        return order;
    }

    async cancelOrder(id: string): Promise<void> {
        await this.updateStatus(id, OrderStatus.CANCELLED);
    }

    // Remover
    async getUser(email: string): Promise<ClientType> {
        return await this.repository.getUser(email);
    }
}
