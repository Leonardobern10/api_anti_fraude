import type InterfaceOrderService from '@modules/domain/order/InterfaceOrderService.js';
import Order from '../model/entity/Order.js';
import { OrderStatus } from '../../domain/order/OrderStatus.js';
import type InterfaceOrderRepository from '@modules/domain/order/InterfaceOrderRepository.js';
import type InterfaceOrderHistoryService from '@modules/domain/order/InterfaceOrderHistoryService.js';
import Approver from '../model/Approver.js';
import type Logger from '@logs/Logger.js';
import type { OrdersByUserResponse } from '../model/OrdersByUserResponse.js';
import type Messaging from 'messaging/Messaging.js';
import BadRequestError from '@errors/BadRequestError.js';
import type { OrderQueryDTO } from '../model/dto/OrderQueryDTO.js';
import type { CountStatsOrderResponse } from '../model/dto/CountStatsOrderResponse.js';
import type { PaymentMethod } from '@modules/checkout/model/infoMethods/PaymentMethod.js';

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
        paymentMethod?: PaymentMethod,
    ): Promise<Order> {
        this.logger.info(`Update order by: ${user}`);
        const order = await this.repository.get(orderId);

        // Não permite que pedidos já cancelados ou aprovados sejam atualizados.
        // ! CORRIGIR ERRO QUANDO PEDIDO JÁ APROVADO, NAO DEVE SER ERRO
        Approver.approveUpdate(order, user);

        await this.orderHistoryService.createOrderHistory(order!);

        let updatedOrder;

        if (paymentMethod) {
            updatedOrder = await this.repository.update(
                order!.id,
                newStatus,
                paymentMethod,
            );
        } else {
            updatedOrder = await this.repository.update(order!.id, newStatus);
        }

        this.logger.info(`Updated order ${order!.id} with successful.`);
        return updatedOrder;
    }

    async cancelOrder(orderId: string, user: string): Promise<void> {
        this.logger.info(`Cancel order ${orderId}`);
        await this.updateStatus(orderId, user, OrderStatus.CANCELLED);
        this.logger.info(`Cancel order ${orderId} with successfull`);
    }

    async getAllOrders(): Promise<{ all: Order[]; count: number } | null> {
        this.logger.info('Getting all orders and count us.');
        const data = await this.repository.getAll();
        if (!data) throw new BadRequestError('Error on get orders');
        else return data;
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
                const { paymentId, orderId, userId, paymentMethod } =
                    JSON.parse(raw);
                this.logger.info(
                    `Evento payment.created recebido para order ${orderId} | Author: ${userId}`,
                );

                try {
                    await this.updateStatus(
                        orderId,
                        userId,
                        OrderStatus.APPROVED,
                        paymentMethod,
                    );

                    await this.messaging.publish(
                        'app.events',
                        `order.updated.${orderId}`,
                        JSON.stringify({
                            success: true,
                            orderId,
                            paymentId,
                            paymentMethod: paymentMethod,
                        }),
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

    public async getOrderWithFilters(dto: OrderQueryDTO): Promise<Order[]> {
        this.logger.info('Getting all orders with filters.');
        return await this.repository.getWithFilters(dto); // ✅ corrigido
    }

    public async getStats(): Promise<CountStatsOrderResponse> {
        this.logger.info('Getting count of all stats about orders in system.');
        return await this.repository.getStats();
    }
}
