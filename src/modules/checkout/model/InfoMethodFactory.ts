import type InterfaceInfoMethod from '@modules/domain/checkout/InterfaceInfoMethod';
import CardPayment from './infoMethods/CardPayment';
import { PaymentMethod } from './infoMethods/PaymentMethod';
import PixPayment from './infoMethods/PixPayment';
import TicketPayment from './infoMethods/TicketPayment';

export default class InfoMethodFactory {
    static create(info: any): InterfaceInfoMethod {
        switch (info.paymentMethod) {
            case PaymentMethod.PIX:
                return new PixPayment(info.pixKey);

            case PaymentMethod.CARD:
                return new CardPayment(info.cardToken, info.installments);

            case PaymentMethod.TICKET:
                return new TicketPayment(new Date(info.dueDate));

            default:
                throw new Error('Invalid payment method');
        }
    }
}
