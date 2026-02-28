import type { IOrderQuery } from '@modules/domain/checkout/InterfaceOrderQuery';
import type OrderRepository from '@modules/order/repository/OrderRepository';
import type InterfaceOrderRepository from '../InterfaceOrderRepository';
import OrderDTO from '../dto/OrderDTO';

export default class OrderQueryLocal implements IOrderQuery {
    private orderRepository: InterfaceOrderRepository;
    constructor(orderRepository: InterfaceOrderRepository) {
        this.orderRepository = orderRepository;
    }

    async findById(orderId: string): Promise<OrderDTO> {
        const order = await this.orderRepository.get(orderId);
        if (!order) throw new Error('User not found');
        return new OrderDTO(
            order.id,
            order.user,
            order.value,
            order.createdAt,
            order.updatedAt,
            order.orderStatus,
            order.orderHistory,
        );
    }
}
