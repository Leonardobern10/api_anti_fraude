import type Order from '@modules/order/model/entity/Order';
import type { OrderStatus } from '@modules/order/model/OrderStatus';

export default interface InterfaceOrderService {
    createOrder(email: string, value: number): Promise<Order>;
    updateStatus(
        orderId: string,
        user: string,
        newStatus: OrderStatus,
    ): Promise<Order>;
    getOrder(id: string, user: string): Promise<Order>;
    cancelOrder(id: string, user: string): Promise<void>;
}
