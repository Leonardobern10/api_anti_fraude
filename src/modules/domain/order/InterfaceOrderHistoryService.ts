import type Order from '@modules/order/model/entity/Order';
import type OrderHistory from '@modules/order/model/entity/OrderHistory';

export default interface InterfaceOrderHistoryService {
    createOrderHistory(order: Order): Promise<OrderHistory>;
}
