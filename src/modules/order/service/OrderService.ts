import type InterfaceOrderService from '@modules/domain/order/InterfaceOrderService.js';
import Order from '../model/entity/Order.js';
import { OrderStatus } from '../../domain/order/OrderStatus.js';
import type InterfaceOrderRepository from '@modules/domain/order/InterfaceOrderRepository.js';
import type InterfaceOrderHistoryService from '@modules/domain/order/InterfaceOrderHistoryService.js';
import Approver from '../model/Approver.js';
import type Logger from '@logs/Logger.js';
import type { OrdersByUserResponse } from '../model/OrdersByUserResponse.js';
import type Messaging from 'messaging/Messaging.js';

export default class OrderService implements InterfaceOrderService {
    private repository: InterfaceOrderRepository;
    private orderHistoryService: InterfaceOrderHistoryService;
    private logger: Logger;
    private messaging: Messaging;

    constructor(
        repository: InterfaceOrderRepository,
        orderHistoryService: InterfaceOrderHistoryService,
        logger: Logger,
        messaging: Messaging, // <-- novo
    ) {
        this.repository = repository;
        this.orderHistoryService = orderHistoryService;
        this.logger = logger;
        this.messaging = messaging;
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

        // Não permite que pedidos já cancelados ou aprovados sejam atualizados.
        // ! CORRIGIR ERRO QUANDO PEDIDO JÁ APROVADO, NAO DEVE SER ERRO
        Approver.approveUpdate(order, user);

        await this.orderHistoryService.createOrderHistory(order!);

        const updatedOrder = await this.repository.update(order!.id, newStatus);

        this.logger.info(`Updated order ${order!.id} with successful.`);
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

    async getOrdersByUser(user: string): Promise<OrdersByUserResponse | null> {
        return await this.repository.getByUser(user);
    }

    public async listenPaymentEvents(): Promise<void> {
        await this.messaging.consume(
            'app.events',
            'payment.created',
            async (raw) => {
                const { paymentId, orderId, userId } = JSON.parse(raw);
                this.logger.info(
                    `Evento payment.created recebido para order ${orderId} | Author: ${userId}`,
                );

                try {
                    await this.updateStatus(
                        orderId,
                        userId,
                        OrderStatus.APPROVED,
                    );

                    await this.messaging.publish(
                        'app.events',
                        `order.updated.${orderId}`,
                        JSON.stringify({ success: true, orderId, paymentId }),
                    );
                } catch (error: any) {
                    this.logger.error(
                        'listen.payment',
                        `Falha ao atualizar order ${orderId}: ${error.message}`,
                    );

                    await this.messaging.publish(
                        'app.events',
                        `order.updated.${orderId}`,
                        JSON.stringify({
                            success: false,
                            orderId,
                            reason: error.message,
                        }),
                    );
                }
            },
        );
    }
}
