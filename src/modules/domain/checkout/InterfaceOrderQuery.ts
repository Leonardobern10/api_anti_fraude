import type OrderDTO from '../order/dto/OrderDTO';

// payment/domain/ports/OrderQuery.ts
export interface IOrderQuery {
    findById(orderId: string): Promise<OrderDTO>;
}
