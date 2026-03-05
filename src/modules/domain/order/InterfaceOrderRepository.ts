import type Order from '@modules/order/model/entity/Order';
import type { OrderStatus } from '@modules/order/model/OrderStatus';
import type OrderHistory from '@modules/order/model/entity/OrderHistory';
import type { OrdersByUserResponse } from '@modules/order/model/OrdersByUserResponse';

export default interface InterfaceOrderRepository {
    save(user: string, value: number): Promise<Order>;
    get(id: string): Promise<Order | null>;
    getByUser(user: string): Promise<OrdersByUserResponse | null>;
    update(
        id: string,
        newStatus: OrderStatus,
        statusPast: OrderHistory,
    ): Promise<Order>;
}
