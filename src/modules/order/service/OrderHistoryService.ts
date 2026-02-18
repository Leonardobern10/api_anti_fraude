import type InterfaceOrderHistoryService from '@modules/domain/order/InterfaceOrderHistoryService';
import type Order from '../model/entity/Order';
import { OrderStatus } from '../model/OrderStatus';
import type OrderHistoryRepository from '../repository/OrderHistoryRepository';
import type OrderHistory from '../model/entity/OrderHistory';

export default class OrderHistoryService implements InterfaceOrderHistoryService {
    private repository: OrderHistoryRepository;

    constructor(repository: OrderHistoryRepository) {
        this.repository = repository;
    }

    public async createOrderHistory(order: Order): Promise<OrderHistory> {
        const orderHistory = await this.repository.save(
            order,
            order.orderStatus,
        );
        return orderHistory;
    }
}
