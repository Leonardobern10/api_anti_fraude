import { OrderStatus } from '../OrderStatus';
import type OrderHistory from './OrderHistory';

export default class Order {
    private id: string;
    private user: string;
    private value: number;
    private createdAt: Date;
    private updatedAt: Date;
    private orderStatus: OrderStatus;
    private orderHistory: OrderHistory[];

    constructor(user: string, value: number) {
        this.id = Math.trunc(Math.random() * 100).toString();
        this.user = user;
        this.value = value;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.orderStatus = OrderStatus.PAYMENT_PENDING;
        this.orderHistory = [];
    }

    getId(): string {
        return this.id;
    }

    getUser(): string {
        return this.user;
    }

    getValue(): number {
        return this.value;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    setUpdatedAt(update: Date): void {
        this.updatedAt = update;
    }

    getOrderStatus(): OrderStatus {
        return this.orderStatus;
    }

    setOrderStatus(orderStatus: OrderStatus): void {
        this.orderStatus = orderStatus;
    }

    getOrderHistory(): OrderHistory[] {
        return this.orderHistory;
    }
}
