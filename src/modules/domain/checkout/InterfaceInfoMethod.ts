import type Payment from '@modules/checkout/model/Payment';

export default interface InterfaceInfoMethod {
    pay(): Payment;
}
