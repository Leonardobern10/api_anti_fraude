import type InterfaceCheckoutRepository from '@modules/domain/checkout/InterfaceCheckoutRepository';
import type Payment from '../model/Payment';

export default class CheckoutRepository implements InterfaceCheckoutRepository {
    private db: Payment[];

    constructor() {
        this.db = [];
    }

    save(payment: Payment): Payment {
        this.db.push(payment);
        return payment;
    }
    get(paymentId: string): Payment | undefined {
        return this.db.find((el) => el.getIdPayment() === paymentId);
    }
    getAll(): Payment[] {
        return this.db;
    }
    update(paymentId: string, updatePayment: Payment): Payment {
        let target = this.db.find((el) => el.getIdPayment() === paymentId);
        if (!target) throw new Error('Payment not found.');
        target = updatePayment;
        return target;
    }
    delete(paymentId: string): void {
        this.db = this.db.filter((el) => el.getIdPayment() !== paymentId);
    }
}
