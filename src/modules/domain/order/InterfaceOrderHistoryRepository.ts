import type Order from '@modules/order/model/entity/Order.js';
import type OrderHistory from '@modules/order/model/entity/OrderHistory.js';
import type { OrderStatus } from '@modules/domain/order/OrderStatus.js';

export default interface InterfaceOrderHistoryRepository {
    save(
        order: Order,
        status: OrderStatus,
        updatedAt: Date,
    ): Promise<OrderHistory>;
    getByID(id: string): Promise<OrderHistory | null>;
    getByStatus(status: OrderStatus): Promise<[OrderHistory[], number]>;
    getByDate(updatedAt: Date): Promise<[OrderHistory[], number]>;
    getByOrder(order: Order): Promise<[OrderHistory[], number]>;
}
