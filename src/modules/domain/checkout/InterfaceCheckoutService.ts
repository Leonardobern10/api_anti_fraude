import type Payment from '@modules/checkout/model/Payment.js';
import type CheckoutDTO from './dto/CheckoutDTO.js';
import type OrderDTO from '../order/dto/OrderDTO.js';

export default interface InterfaceCheckoutService {
    pay(dto: CheckoutDTO): Promise<Payment>;
    getOrderInfoOnOrder(orderId: string): Promise<OrderDTO>;
}
