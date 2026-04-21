import Payment from '../model/Payment.js';
import type CheckoutDTO from '@modules/domain/checkout/dto/CheckoutDTO.js';
import type InterfaceCheckoutRepository from '@modules/domain/checkout/InterfaceCheckoutRepository.js';
import type InterfaceCheckoutService from '@modules/domain/checkout/InterfaceCheckoutService.js';
import type OrderDTO from '@modules/domain/order/dto/OrderDTO.js';
import type { IOrderQuery } from '@modules/domain/checkout/InterfaceOrderQuery.js';

export default class CheckoutService implements InterfaceCheckoutService {
    private repository: InterfaceCheckoutRepository;
    private orderQuery: IOrderQuery;

    constructor(
        repository: InterfaceCheckoutRepository,
        orderQuery: IOrderQuery,
    ) {
        this.repository = repository;
        this.orderQuery = orderQuery;
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

        return this.repository.save(payment);
    }
}
