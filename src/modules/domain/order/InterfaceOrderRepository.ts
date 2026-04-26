import type Order from '@modules/order/model/entity/Order.js';
import type { OrderStatus } from '@modules/domain/order/OrderStatus.js';
import type OrderHistory from '@modules/order/model/entity/OrderHistory.js';
import type { OrdersByUserResponse } from '@modules/order/model/OrdersByUserResponse.js';
import type { OrderQueryDTO } from '@modules/order/model/dto/OrderQueryDTO.js';

export default interface InterfaceOrderRepository {
    save(user: string, value: number): Promise<Order>;
    getAll(): Promise<{ all: Order[]; count: number } | null>;
    get(id: string): Promise<Order | null>;
    getByUser(user: string): Promise<OrdersByUserResponse | null>;
    update(id: string, newStatus: OrderStatus): Promise<Order>;
    getWithFilters(query: OrderQueryDTO): Promise<Order[]>;
}
