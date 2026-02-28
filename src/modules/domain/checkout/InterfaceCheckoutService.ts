import type Payment from '@modules/checkout/model/Payment';
import type CheckoutDTO from './dto/CheckoutDTO';
import type { UserDTO } from '../auth/dto/UserDTO';
import type OrderDTO from '../order/dto/OrderDTO';

export default interface InterfaceCheckoutService {
    pay(dto: CheckoutDTO): Promise<Payment>;
    getUserInfoOnAuth(userEmail: string): Promise<UserDTO>;
    getOrderInfoOnOrder(orderId: string): Promise<OrderDTO>;
}
