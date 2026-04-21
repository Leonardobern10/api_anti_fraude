import type InterfaceOrderHistoryService from '@modules/domain/order/InterfaceOrderHistoryService.js';
import type Order from '../model/entity/Order.js';
import type OrderHistoryRepository from '../repository/OrderHistoryRepository.js';
import type OrderHistory from '../model/entity/OrderHistory.js';

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
