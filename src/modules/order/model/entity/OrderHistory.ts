import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../OrderStatus';
import Order from './Order';

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
    order!: Order;
}
