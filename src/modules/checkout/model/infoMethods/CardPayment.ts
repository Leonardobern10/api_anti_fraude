import type InterfaceInfoMethod from '@modules/domain/checkout/InterfaceInfoMethod';
import type Payment from '../Payment';

export default class CardPayment implements InterfaceInfoMethod {
    private readonly cardToken: string;
    private readonly installments: number;

    constructor(cardToken: string, installments: number) {
        this.cardToken = cardToken;
        this.installments = installments;
    }

    public getCardToken() {
        return this.cardToken;
    }

    public getInstallments() {
        return this.installments;
    }

    pay(): Payment {
        throw new Error('Method not implemented.');
    }
}
