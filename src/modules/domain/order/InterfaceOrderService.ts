import type Order from '@modules/order/model/entity/Order';
import type { OrderStatus } from '@modules/order/model/OrderStatus';
import type { ClientType } from '../types/ClientType';

export default interface InterfaceOrderService {
    verificarToken(token: string): Promise<boolean>;
    getUserByEmail(email: string): Promise<ClientType>;
    construirOrder(user: ClientType, value: number): Order;
    createOrder(email: string, value: number): Promise<Order>;
    atualizarStatus(id: string, newStatus: OrderStatus): Promise<Order>;
    getOrder(id: string): Promise<Order>;
    removerPedido(id: string): Promise<boolean>;
}
