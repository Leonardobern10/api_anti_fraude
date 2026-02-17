import type InterfaceOrderService from '@modules/domain/order/InterfaceOrderService';
import Order from '../model/entity/Order';
import type { OrderStatus } from '../model/OrderStatus';
import type InterfaceOrderRepository from '@modules/domain/order/InterfaceOrderRepository';
import type { ClientType } from '@modules/domain/types/ClientType';
import OrderHistory from '../model/entity/OrderHistory';

export default class OrderService implements InterfaceOrderService {
    private repository: InterfaceOrderRepository;

    constructor(repository: InterfaceOrderRepository) {
        this.repository = repository;
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
        if (!user) throw new Error('User not found.', { cause: 404 });
        const newOrder = new Order(email, value);
        return await this.repository.save(newOrder);
    }
    async atualizarStatus(id: string, newStatus: OrderStatus): Promise<Order> {
        const order = await this.repository.get(id);
        if (!order) throw new Error('Order not found.', { cause: 404 });
        const orderHistory = new OrderHistory(
            order.getUpdatedAt(),
            order.getOrderStatus(),
        );
        order.getOrderHistory().push(orderHistory);
        order.setUpdatedAt(new Date());
        order.setOrderStatus(newStatus);
        return order;
    }
    getOrder(id: string): Promise<Order> {
        return this.repository.get(id);
    }
    removerPedido(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    // Remover
    async getUser(email: string): Promise<ClientType> {
        return await this.repository.getUser(email);
    }
}
