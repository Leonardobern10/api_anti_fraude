import type { OrderStatus } from '../OrderStatus';

export default class OrderHistory {
    public readonly updatedAt: Date;
    public readonly currentStatus: OrderStatus;

    constructor(updatedAt: Date, currentStatus: OrderStatus) {
        this.updatedAt = updatedAt;
        this.currentStatus = currentStatus;
    }
}
