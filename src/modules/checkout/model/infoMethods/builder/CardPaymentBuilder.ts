import type InterfaceInfoMethod from '@modules/domain/checkout/InterfaceInfoMethod';
import type InterfaceInfoMethodBuilder from '@modules/domain/checkout/InterfaceInfoMethodBuilder';
import CardPayment from '../CardPayment';

export default class CardPaymentBuilder implements InterfaceInfoMethodBuilder {
    private cardToken: string | null;
    private installments: number | null;

    constructor() {
        this.cardToken = null;
        this.installments = null;
    }

    public setCardToken(cardToken: string): CardPaymentBuilder {
        this.cardToken = cardToken;
        return this;
    }

    public setInstallments(installments: number): CardPaymentBuilder {
        this.installments = installments;
        return this;
    }

    buildInfoMethod(): InterfaceInfoMethod | undefined {
        if (!(this.cardToken && this.installments))
            throw new Error('Error on build InfoMethod.');
        return new CardPayment(this.cardToken, this.installments);
    }
}
