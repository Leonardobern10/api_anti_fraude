import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { OrderStatus } from '../../../domain/order/OrderStatus.js';
import Order from './Order.js';

@Entity()
export default class OrderHistory {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @UpdateDateColumn()
    updatedAt!: Date;
    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PAYMENT_PENDING,
    })
    currentStatus: OrderStatus = OrderStatus.PAYMENT_PENDING;
    @ManyToOne(() => Order, (order) => order.orderHistory)
    order!: Relation<Order>;
}
