import type InterfaceInfoMethod from '@modules/domain/checkout/InterfaceInfoMethod.js';
import CardPayment from './infoMethods/CardPayment.js';
import { PaymentMethod } from './infoMethods/PaymentMethod.js';
import PixPayment from './infoMethods/PixPayment.js';
import TicketPayment from './infoMethods/TicketPayment.js';

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
