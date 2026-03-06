import type Payment from '@modules/checkout/model/Payment.js';

export default interface InterfaceInfoMethod {
    pay(): Payment;
}
