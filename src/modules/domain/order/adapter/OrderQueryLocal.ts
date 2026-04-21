import type { IOrderQuery } from '@modules/domain/checkout/InterfaceOrderQuery.js';
import type InterfaceOrderRepository from '../InterfaceOrderRepository.js';
import OrderDTO from '../dto/OrderDTO.js';

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
