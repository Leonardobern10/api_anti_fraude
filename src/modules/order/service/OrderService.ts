import type InterfaceOrderService from '@modules/domain/order/InterfaceOrderService';
import Order from '../model/entity/Order';
import { OrderStatus } from '../model/OrderStatus';
import type InterfaceOrderRepository from '@modules/domain/order/InterfaceOrderRepository';
import type InterfaceOrderHistoryService from '@modules/domain/order/InterfaceOrderHistoryService';
import Approver from '../model/Approver';
import type Logger from '@logs/Logger';

export default class OrderService implements InterfaceOrderService {
    private repository: InterfaceOrderRepository;
    private orderHistoryService: InterfaceOrderHistoryService;
    private logger: Logger;

    constructor(
        repository: InterfaceOrderRepository,
        orderHistoryService: InterfaceOrderHistoryService,
        logger: Logger,
    ) {
        this.repository = repository;
        this.orderHistoryService = orderHistoryService;
        this.logger = logger;
    }

    async createOrder(email: string, value: number): Promise<Order> {
        this.logger.info(`Create order by: ${email} | Value: ${value}`);
        return await this.repository.save(email, value);
    }

    async updateStatus(
        orderId: string,
        user: string,
        newStatus: OrderStatus,
    ): Promise<Order> {
        this.logger.info(`Update order by: ${user}`);
        const order = await this.repository.get(orderId);
        Approver.approveUpdate(order, user);
        const history = await this.orderHistoryService.createOrderHistory(
            order!,
        );
        const updatedOrder = await this.repository.update(
            order!.id,
            newStatus,
            history,
        );
        this.logger.info(`Update order ${order!.id} with successful.`);
        return updatedOrder;
    }

    async cancelOrder(orderId: string, user: string): Promise<void> {
        this.logger.info(`Cancel order ${orderId}`);
        await this.updateStatus(orderId, user, OrderStatus.CANCELLED);
        this.logger.info(`Cancel order ${orderId} with successfull`);
    }

    async getOrder(orderId: string, user: string): Promise<Order> {
        this.logger.info(`Getting order ${orderId}`);
        const order = await this.repository.get(orderId);
        Approver.approveAccess(order, user);
        this.logger.info(`Getting order ${orderId} with successfull`);
        return order!;
    }
}
