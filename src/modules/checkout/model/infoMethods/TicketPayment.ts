import type InterfaceInfoMethod from '@modules/domain/checkout/InterfaceInfoMethod';
import type Payment from '../Payment';

export default class TicketPayment implements InterfaceInfoMethod {
    private readonly dueDate: Date;

    constructor(dueDate: Date) {
        this.dueDate = dueDate;
    }

    public getDueDate(): Date {
        return this.dueDate;
    }

    public getDateToString(): string {
        return this.dueDate.toLocaleDateString();
    }

    pay(): Payment {
        throw new Error('Method not implemented.');
    }
}
