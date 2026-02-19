import type InterfaceOrderService from '@modules/domain/order/InterfaceOrderService';
import Order from '../model/entity/Order';
import { OrderStatus } from '../model/OrderStatus';
import type InterfaceOrderRepository from '@modules/domain/order/InterfaceOrderRepository';
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

    async createOrder(email: string, value: number): Promise<Order> {
        return await this.repository.save(email, value);
    }

    async updateStatus(
        orderId: string,
        user: string,
        newStatus: OrderStatus,
    ): Promise<Order> {
        const order = await this.repository.get(orderId, user);
        if (!order)
            throw new Error(MSG.ORDER.ERROR.NOT_FOUND, {
                cause: HttpStatus.NOT_FOUND,
            });
        const history =
            await this.orderHistoryService.createOrderHistory(order);
        const updatedOrder = await this.repository.update(
            order.id,
            user,
            newStatus,
            history,
        );
        return updatedOrder;
    }

    async cancelOrder(orderId: string, user: string): Promise<void> {
        await this.updateStatus(orderId, user, OrderStatus.CANCELLED);
    }

    async getOrder(orderId: string, user: string): Promise<Order> {
        return await this.repository.get(orderId, user);
    }
}
