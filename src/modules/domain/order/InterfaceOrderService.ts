import type Order from '@modules/order/model/entity/Order.js';
import type { OrdersByUserResponse } from '@modules/order/model/OrdersByUserResponse.js';
import type { OrderStatus } from '@modules/order/model/OrderStatus.js';

export default interface InterfaceOrderService {
    createOrder(email: string, value: number): Promise<Order>;
    updateStatus(
        orderId: string,
        user: string,
        newStatus: OrderStatus,
    ): Promise<Order>;
    getOrder(id: string, user: string): Promise<Order>;
    getOrdersByUser(user: string): Promise<OrdersByUserResponse | null>;
    cancelOrder(id: string, user: string): Promise<void>;
}
