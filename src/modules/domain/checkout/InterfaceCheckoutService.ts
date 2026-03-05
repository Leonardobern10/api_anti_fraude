import type Payment from '@modules/checkout/model/Payment';
import type CheckoutDTO from './dto/CheckoutDTO';
import type OrderDTO from '../order/dto/OrderDTO';

export default interface InterfaceCheckoutService {
    pay(dto: CheckoutDTO): Promise<Payment>;
    getOrderInfoOnOrder(orderId: string): Promise<OrderDTO>;
}
