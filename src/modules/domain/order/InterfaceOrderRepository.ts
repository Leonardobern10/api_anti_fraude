import type Order from '@modules/order/model/entity/Order';
import type { OrderStatus } from '@modules/order/model/OrderStatus';
import type OrderHistory from '@modules/order/model/entity/OrderHistory';

export default interface InterfaceOrderRepository {
    save(user: string, value: number): Promise<Order>;
    get(id: string, user: string): Promise<Order>;
    update(
        id: string,
        user: string,
        newStatus: OrderStatus,
        statusPast: OrderHistory,
    ): Promise<Order>;
}
