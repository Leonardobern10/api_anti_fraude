import type InterfaceOrderService from '@modules/domain/order/InterfaceOrderService';
import Order from '../model/entity/Order';
import { OrderStatus } from '../model/OrderStatus';
import type InterfaceOrderRepository from '@modules/domain/order/InterfaceOrderRepository';
import type { ClientType } from '@modules/domain/types/ClientType';
import OrderHistory from '../model/entity/OrderHistory';
import { MSG } from '@utils/MessageResponse';
import type InterfaceOrderHistoryService from '@modules/domain/order/InterfaceOrderHistoryService';
import { HttpStatus } from '@utils/HttpStatus.utils';

export default class OrderService implements InterfaceOrderService {
    private repository: InterfaceOrderRepository;
    private orderHistoryService: InterfaceOrderHistoryService;

    constructor(
        repository: InterfaceOrderRepository,
        orderHistoryService: InterfaceOrderHistoryService,
    ) {
        this.repository = repository;
        this.orderHistoryService = orderHistoryService;
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
        return await this.repository.save(email, value);
    }

    async updateStatus(
        orderId: string,
        newStatus: OrderStatus,
    ): Promise<Order> {
        const order = await this.repository.get(orderId);
        if (!order) throw new Error(MSG.ORDER.ERROR.NOT_FOUND, { cause: 404 });
        const history =
            await this.orderHistoryService.createOrderHistory(order);
        const updatedOrder = await this.repository.update(
            order.id,
            newStatus,
            history,
        );
        return updatedOrder;
    }

    async getOrder(orderId: string): Promise<Order> {
        const order = await this.repository.get(orderId);
        if (!order)
            throw new Error(MSG.ORDER.ERROR.NOT_FOUND, {
                cause: HttpStatus.NOT_FOUND,
            });
        return order;
    }

    async cancelOrder(orderId: string): Promise<void> {
        await this.updateStatus(orderId, OrderStatus.CANCELLED);
    }

    // Remover
    async getUser(email: string): Promise<ClientType> {
        return await this.repository.getUser(email);
    }
}
