import type Order from '@modules/order/model/entity/Order.js';
import type OrderHistory from '@modules/order/model/entity/OrderHistory.js';

export default interface InterfaceOrderHistoryService {
    createOrderHistory(order: Order): Promise<OrderHistory>;
}
