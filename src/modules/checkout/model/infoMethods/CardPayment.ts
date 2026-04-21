import type InterfaceInfoMethod from '@modules/domain/checkout/InterfaceInfoMethod.js';
import type Payment from '../Payment.js';

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

    public toJSON() {
        return {
            cardToken: this.cardToken,
            installments: this.installments,
        };
    }

    pay(): Payment {
        throw new Error('Method not implemented.');
    }
}
