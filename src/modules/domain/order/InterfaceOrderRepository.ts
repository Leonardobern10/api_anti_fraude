import type Order from '@modules/order/model/entity/Order';
import type { OrderStatus } from '@modules/order/model/OrderStatus';
import type { ClientType } from '../types/ClientType';

export default interface InterfaceOrderRepository {
    save(newOrder: Order): Promise<Order>;
    delete(id: string): Promise<boolean>;
    get(id: string): Promise<Order>;
    update(id: string, newStatus: OrderStatus): Promise<Order>;
    getUser(email: string): Promise<ClientType>;
}
