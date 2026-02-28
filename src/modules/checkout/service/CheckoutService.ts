import Payment from '../model/Payment';
import type CheckoutDTO from '@modules/domain/checkout/dto/CheckoutDTO';
import type InterfaceCheckoutRepository from '@modules/domain/checkout/InterfaceCheckoutRepository';
import type InterfaceCheckoutService from '@modules/domain/checkout/InterfaceCheckoutService';
import type { UserDTO } from '@modules/domain/auth/dto/UserDTO';
import type OrderDTO from '@modules/domain/order/dto/OrderDTO';
import type { IUserQuery } from '@modules/domain/checkout/InterfaceUserQuery';
import type { IOrderQuery } from '@modules/domain/checkout/InterfaceOrderQuery';

export default class CheckoutService implements InterfaceCheckoutService {
    private repository: InterfaceCheckoutRepository;
    private userQuery: IUserQuery;
    private orderQuery: IOrderQuery;

    constructor(
        repository: InterfaceCheckoutRepository,
        userQuery: IUserQuery,
        orderQuery: IOrderQuery,
    ) {
        this.repository = repository;
        this.userQuery = userQuery;
        this.orderQuery = orderQuery;
    }
    async getUserInfoOnAuth(userEmail: string): Promise<UserDTO> {
        const user = await this.userQuery.findById(userEmail);
        if (!user) throw new Error('User not found');
        return user;
    }
    async getOrderInfoOnOrder(orderId: string): Promise<OrderDTO> {
        const order = await this.orderQuery.findById(orderId);
        if (!order) throw new Error('Order not found');
        return order;
    }

    async pay(dto: CheckoutDTO): Promise<Payment> {
        const user = await this.getUserInfoOnAuth(dto.userId);
        const order = await this.getOrderInfoOnOrder(dto.orderId);

        const payment = new Payment(
            dto.idPayment,
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
