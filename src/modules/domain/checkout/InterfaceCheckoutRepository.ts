import type Payment from '@modules/checkout/model/Payment';

export default interface InterfaceCheckoutRepository {
    save(payment: Payment): Payment;
    get(paymentId: string): Payment | undefined;
    getAll(): Payment[];
    update(paymentId: string, updatePayment: Payment): Payment;
    delete(paymentId: string): void;
}
