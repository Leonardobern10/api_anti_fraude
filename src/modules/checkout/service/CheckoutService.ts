import type InterfaceCheckoutRepository from '@modules/domain/checkout/InterfaceCheckoutRepository.js';
import Payment from '../model/Payment.js';
import type InterfaceCheckoutService from '@modules/domain/checkout/InterfaceCheckoutService.js';
import type { IOrderQuery } from '@modules/domain/checkout/InterfaceOrderQuery.js';
import type CheckoutDTO from '@modules/domain/checkout/dto/CheckoutDTO.js';
import type OrderDTO from '@modules/domain/order/dto/OrderDTO.js';
import type Messaging from 'messaging/Messaging.js';

const EXCHANGE = 'app.events';

export default class CheckoutService implements InterfaceCheckoutService {
    private repository: InterfaceCheckoutRepository;
    private orderQuery: IOrderQuery;
    private messaging: Messaging;

    constructor(
        repository: InterfaceCheckoutRepository,
        orderQuery: IOrderQuery,
        messaging: Messaging,
    ) {
        this.repository = repository;
        this.orderQuery = orderQuery;
        this.messaging = messaging;
    }

    async getOrderInfoOnOrder(orderId: string): Promise<OrderDTO> {
        const order = await this.orderQuery.findById(orderId);
        if (!order) throw new Error('Order not found');
        return order;
    }

    async pay(dto: CheckoutDTO): Promise<Payment> {
        const order = await this.getOrderInfoOnOrder(dto.orderId);

        const payment = new Payment(
            crypto.randomUUID(),
            dto.orderId,
            order.value,
            dto.userId,
            dto.paymentMethod,
            dto.infoMethod,
            dto.currency,
            dto.ipAddress,
            dto.userAgent,
            dto.requestedAt,
        );

        this.repository.save(payment);

        // 1. Registra o listener ANTES de publicar
        const orderUpdateResult = new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Timeout: order service did not respond'));
            }, 10_000);

            this.messaging.consumeOnce(
                EXCHANGE,
                `order.updated.${dto.orderId}`,
                (msg) => {
                    clearTimeout(timeout);
                    const data = JSON.parse(msg);
                    if (data.success) resolve();
                    else
                        reject(new Error(data.reason ?? 'Order update failed'));
                },
            );
        });

        // 2. Só então publica
        await this.messaging.publish(
            EXCHANGE,
            'payment.created',
            JSON.stringify({
                paymentId: payment.getIdPayment(),
                orderId: dto.orderId,
                userId: dto.userId,
                paymentMethod: dto.paymentMethod,
            }),
        );

        // 3. Aguarda a resposta
        await orderUpdateResult;
        return payment;
    }
}
