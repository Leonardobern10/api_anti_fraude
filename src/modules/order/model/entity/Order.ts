import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../OrderStatus';
import OrderHistory from './OrderHistory';

@Entity()
export default class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @Column({ type: 'varchar', length: 90 })
    user!: string;
    @Column({ type: 'numeric', precision: 10, scale: 2 })
    value!: number;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PAYMENT_PENDING,
    })
    orderStatus!: OrderStatus;
    @OneToMany(() => OrderHistory, (orderHistory) => orderHistory.order)
    orderHistory!: OrderHistory[];
}
