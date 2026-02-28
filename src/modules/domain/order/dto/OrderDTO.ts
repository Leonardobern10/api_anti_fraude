import type OrderHistory from '@modules/order/model/entity/OrderHistory';
import type { OrderStatus } from '@modules/order/model/OrderStatus';

export default class OrderDTO {
    public readonly id!: string;
    public readonly user!: string;
    public readonly value!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly orderStatus!: OrderStatus;
    public readonly orderHistory!: OrderHistory[];

    constructor(
        id: string,
        user: string,
        value: number,
        createdAt: Date,
        updatedAt: Date,
        orderStatus: OrderStatus,
        orderHistory: OrderHistory[]
    ) {
        this.id = id;
        this.user = user;
        this.value = value;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.orderStatus = orderStatus;
        this.orderHistory = orderHistory;
    }
}
