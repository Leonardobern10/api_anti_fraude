import type Order from '@modules/order/model/entity/Order';
import type { OrderStatus } from '@modules/order/model/OrderStatus';
import type { ClientType } from '../types/ClientType';
import type OrderHistory from '@modules/order/model/entity/OrderHistory';

export default interface InterfaceOrderService {
    verificarToken(token: string): Promise<boolean>;
    getUserByEmail(email: string): Promise<ClientType>;
    construirOrder(user: ClientType, value: number): Order;
    createOrder(email: string, value: number): Promise<Order>;
    updateStatus(id: string, newStatus: OrderStatus): Promise<Order>;
    getOrder(id: string): Promise<Order>;
    cancelOrder(id: string): Promise<void>;
}
