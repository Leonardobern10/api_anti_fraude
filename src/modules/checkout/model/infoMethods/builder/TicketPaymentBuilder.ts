import type InterfaceInfoMethod from '@modules/domain/checkout/InterfaceInfoMethod.js';
import type InterfaceInfoMethodBuilder from '@modules/domain/checkout/InterfaceInfoMethodBuilder.js';
import TicketPayment from '../TicketPayment.js';

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
