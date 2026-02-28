import type InterfaceInfoMethod from '@modules/domain/checkout/InterfaceInfoMethod';
import type InterfaceInfoMethodBuilder from '@modules/domain/checkout/InterfaceInfoMethodBuilder';
import TicketPayment from '../TicketPayment';

export default class TicketPaymentBuilder implements InterfaceInfoMethodBuilder {
    private dueDate: Date | null;

    constructor() {
        this.dueDate = null;
    }

    public setDueDate(dueDate: Date): TicketPaymentBuilder {
        this.dueDate = dueDate;
        return this;
    }

    buildInfoMethod(): InterfaceInfoMethod | undefined {
        if (!this.dueDate) throw new Error('Error on build InfoMethod.');
        return new TicketPayment(this.dueDate);
    }
}
